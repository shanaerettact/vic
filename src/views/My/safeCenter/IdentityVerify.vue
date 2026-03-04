<script setup>
import { inject, reactive, ref, computed, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n';
import HeaderCross from "@/components/Utilities/HeaderCross.vue";
import IconTemplate from '@/components/Icons/IconTemplate.vue';
import { noData } from "@/components/Images/base64.js";
import Compressor from 'compressorjs';
import BankAccount_tw from "@/lang/Notes/BankAccount_tw.html?raw"


const common = inject("common")
const { t, locale } = useI18n()

const state = reactive({
  isLogin: false,
  previewUrls: [],
  compressedSize: null,
  email: "",
  idCard1: null,
  idCard2: null,
  idCard3: null,
})


// 初始化 API
const IdentityInit = async () => {
  try {
    const res = await common.baseAjax("POST", "/user/verify")
    if (res.code == 1) {
      state.isLogin = true
    } else {
      if (res.code == 2) {
        setTimeout(() => {
          common.toRouter("/my")
        }, 1000)
      }
      common.userController(res.code, res.msg)
    }
  } catch (error) {
    common.catchError(error)
  }
}

IdentityInit()




function compressImage(file) {
  return new Promise((res, rej) => {
    new Compressor(file, {
      quality: 0.8,
      maxWidth: 1000,
      maxHeight: 1000,
      success(compressedBlob) {

        const compressedImage = blobToFile(compressedBlob, file)
        res(compressedImage)
      },
      error(err) {
        rej(err)
      }
    })
  })
}


function blobToFile(blob, originalFile) {
  let fileName = "zip_" + originalFile.name
  return new File([blob], fileName, {
    type: blob.type,
    lastModified: Date.now()
  })
}

const beforeUpload = async (e, side) => {
  const file = e.target.files?.[0]

  if (!file) return false

  let allowTypes = ["image/jpeg", "image/png"] 
  let maxSize = 3

  if (!allowTypes.includes(file.type)) {
    common.alert("fail", "檔案格式僅支援 jpg、png，\n 您選擇的格式為：" + file.type)
    return
  }

  if (file.size > maxSize * 1024 * 1024) {
    common.alert("fail", `檔案大小不可超過 ${maxSize} MB`)
    return false
  }

  let compressedFile

 
  try {
    compressedFile = await compressImage(file)
  } catch (error) {
    console.log(error)
    common.alert("fail", "圖片壓縮失敗")
    return false
  }

  if (side == "front") {
    if (state.previewUrls[0]) URL.revokeObjectURL(state.previewUrls[0])
    state.previewUrls[0] = URL.createObjectURL(compressedFile)
    state.idCard1 = compressedFile
  }

  if (side == "back") {
    if (state.previewUrls[1]) URL.revokeObjectURL(state.previewUrls[1])
    state.previewUrls[1] = URL.createObjectURL(compressedFile)
    state.idCard2 = compressedFile
  }

  if (side == "self") {
    if (state.previewUrls[2]) URL.revokeObjectURL(state.previewUrls[2])
    state.previewUrls[2] = URL.createObjectURL(compressedFile)
    state.idCard3 = compressedFile
  }
}


const submitForm = async () => {
  if (!state.idCard1 || !state.idCard2 || !state.idCard3) {
    common.alert("fail", "請上傳身分證所有圖片")
    return
  }

  let FF = new FormData()
  FF.append("email", state.email)
  FF.append("idCard1", state.idCard1)
  FF.append("idCard2", state.idCard2)
  FF.append("idCard3", state.idCard3)


  common.loading = true
  try {
    const res = await common.baseAjaxImage("POST", "/user/verify", FF)
    if (res.code == 1) {
      common.alert("", "提交成功, 稍後為您跳轉至首頁")
      setTimeout(() => {
        common.toRouter("/")
        common.loading = false
      }, 2500)
    } else {
      common.userController(res.code, res.msg)
    }
  } catch (error) {
    common.catchError(error)
  } finally { }
}


onBeforeUnmount(() => { 
  state.previewUrls.forEach(url => {
    if (url) URL.revokeObjectURL(url)
  })
})
</script>


<template>
  <div class="identityVerify-wrapper">
    <div class="main">
      <HeaderCross text="身分驗證" />
      <div class="top">

        <div class="content">
          <form>
            <div class="form-item">
              <h4>電子郵件</h4>
              <van-field
                :placeholder="`填寫電子郵件`"
                v-model="state.email"
              />
            </div>
            <div class="form-item">
              <h4>上傳圖片</h4>
              <div class="note-upload">
                <van-icon name="warning" />
                <span> 僅支援 png、jpg，檔案上限 3MB</span>
              </div>
              <div class="note-upload">
                <van-icon name="warning" />
                <span>重複姓名註冊，務必提交身分證件驗證</span>
              </div>
              <div class="note-upload">
                <van-icon name="warning" />
                <span>身分證與存摺:請完整拍攝四個邊角，保持圖片清晰可讀。</span>
              </div>
            </div>
            <div class="form-item custom-file-upload">
              <div class="file-upload-item">
                <label
                  for="upload-file-0"
                  class="upload-btn"
                  :style="`background-image: url(${state.previewUrls[0] || ''});`"
                >
                  <IconTemplate
                    v-if="!state.idCard1"
                    :iconWidth="'50px'"
                    :iconHeight="'50px'"
                    :iconClass="'icon-upload'"
                  />
                  <span>身分證正面</span>
                </label>
                <input
                  id="upload-file-0"
                  type="file"
                  accept="image/*"
                  hidden
                  @change="e => beforeUpload(e, 'front')"
                />
              </div>
              <div class="file-upload-item">
                <label
                  for="upload-file-1"
                  class="upload-btn"
                  :style="`background-image: url(${state.previewUrls[1] || ''}); `"
                >
                  <IconTemplate
                    v-if="!state.idCard2"
                    :iconWidth="'50px'"
                    :iconHeight="'50px'"
                    :iconClass="'icon-upload'"
                  />
                  <span>身分證反面</span>
                </label>
                <input
                  id="upload-file-1"
                  type="file"
                  accept="image/*"
                  hidden
                  @change="e => beforeUpload(e, 'back')"
                />
              </div>
              <div class="file-upload-item">
                <label
                  for="upload-file-2"
                  class="upload-btn"
                  :style="`background-image: url(${state.previewUrls[2] || ''}); `"
                >
                  <IconTemplate
                    v-if="!state.idCard3"
                    :iconWidth="'50px'"
                    :iconHeight="'50px'"
                    :iconClass="'icon-upload'"
                  />
                  <span>手持身分證的正面自拍照</span>
                </label>
                <input
                  id="upload-file-2"
                  type="file"
                  accept="image/*"
                  hidden
                  @change="e => beforeUpload(e, 'self')"
                />
              </div>
            </div>
          </form>

          <div
            class="update-gray-box"
            @click="submitForm"
          >
            <span>送出</span>
          </div>
          <div
            class="update-gray-box"
            @click="common.toBack()"
          >
            <span>取消</span>
          </div>
        </div>
      </div>


    </div>
  </div>

</template>


<style lang="scss" scoped>
.identityVerify-wrapper {
  height: 100%; // 多這一層 my-wrapper，手動新增高度
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
}


// 
::v-deep(.van-nav-bar) {
  background: var(--bg-color);
}

:deep(.van-nav-bar__content) {
  position: relative;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  height: 1.22667rem;
}

:deep(.van-nav-bar__title) {
  color: var(--font-color) !important;
  font-weight: 650;
  font-size: .42667rem !important;
  max-width: 60%;
  margin: 0 auto;
}

:deep(.van-hairline--bottom):after {
  border-bottom-width: 0px;
}

.van-cell {
  margin-top: .2rem;
  background-color: var(--bg-color);
  border-bottom: 0px;
  border-radius: 5px;
}


.main {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  width: 100%;
  flex: 1;
  padding-bottom: 2rem;

  .top {
    margin: .373rem .32rem .32rem .32rem;
    padding: 0 .293rem .3467rem;
    background: var(--bg-light-color);
    border-radius: .2133rem;
  }


  .top .content {
    display: flex;
    flex-direction: column;
    color: var(--font-color);
    position: relative;
    padding-top: .5rem;


    .form-item:not(:first-of-type) {
      margin-top: .4rem;
    }

    .form-item .note-upload {
      width: 100%;
      min-height: .2rem;
      background-color: var(--info-bg);
      opacity: .8;
      border-radius: 5px;
      margin-top: .3rem;
      padding: .3rem;

      span {
        line-height: .65rem;
      }

      i {
        color: var(--warning-color);
        font-size: large;
        margin-right: .1rem;
        opacity: .7;
      }
    }

    .custom-file-upload {
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin-top: .2rem;
      gap: .3rem;
      flex-wrap: wrap;

      .file-upload-item {
        width: 48%;
        border: var(--border-dashed);
      }

      .file-upload-item:nth-child(3) {
        width: 80%;
      }
    }

    label.upload-btn {
      display: flex; 
      height: 2.5rem;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      gap: .15rem;
      cursor: pointer;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }

    .file-upload-item:nth-child(3) label.upload-btn {
      height: 4rem;
    }

    .update-gray-box {
      flex-shrink: 0;
      margin-top: .3733rem;
      border-radius: .13333rem;
      background: var(--bg-color);
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      -webkit-justify-content: center;
      align-items: center;
      -webkit-align-items: center;
      flex-direction: row;
      -webkit-flex-direction: row;
      flex-wrap: nowrap;
      -webkit-flex-wrap: nowrap;

      span {
        padding: .34667rem 0;
        color: var(--font-dark-color);
        text-align: center;
        // font-family: PingFang SC;
        font-size: .42667rem;
        font-style: normal;
        font-weight: 650;
        line-height: normal;
      }
    }
  }

}
</style>