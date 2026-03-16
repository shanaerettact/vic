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
  accountExist: false,
  addAccountMode: false,
  showBankList: false,
  previewUrls: [],
  activeBank: "",  
  compressedSize: null, 
  bankListMode: false,
  bankList: [],
  initDone: false,
})

const bankForm = reactive({
  title: "", 
  bank: null, 
  branch: "", 
  branch_code: "",
  account: "", 
  bankBook1: "", 
  bankBook2: "",
})

const bankInit = async () => {
  try {
    const res = await common.baseAjax("POST", "/user/bank-list")
    if (res.code == 1) {
      state.isLogin = true
      state.bankList = res.data.list ?? []
      state.bankListMode = state.bankList.length > 0
    } else {
      if (res.code == 2) {
        setTimeout(() => {
          common.toRouter("/my")
        }, 1000)
      }
      state.bankListMode = false
      common.userController(res.code, res.msg)
    }
  } catch (error) {
    common.catchError(error)
  }
  state.initDone = true
}

bankInit()


const bankList = [
  { id: 1, text: '700-中華郵政' },
  { id: 2, text: '004-臺灣銀行' },
  { id: 3, text: '005-臺灣土地銀行' },
  { id: 4, text: '006-合作金庫商業銀行' },
  { id: 5, text: '007-第一商業銀行' },
  { id: 6, text: '008-華南商業銀行' },
  { id: 7, text: '009-彰化商業銀行' },
  { id: 8, text: '011-上海商業儲蓄銀行' },
  { id: 9, text: '012-台北富邦商業銀行' },
  { id: 10, text: '013-國泰世華商業銀行' },
  { id: 11, text: '015-中國輸出入銀行' },
  { id: 12, text: '016-高雄銀行' },
  { id: 13, text: '017-兆豐國際商業銀行' },
  { id: 14, text: '021-花旗(台灣)商業銀行' },
  { id: 15, text: '048-王道商業銀行' },
  { id: 16, text: '050-臺灣中小企業銀行' },
  { id: 17, text: '052-渣打國際商業銀行' },
  { id: 18, text: '053-台中商業銀行' },
  { id: 19, text: '054-京城商業銀行' },
  { id: 20, text: '081-滙豐(台灣)商業銀行' },
  { id: 21, text: '101-瑞興商業銀行' },
  { id: 22, text: '102-華泰商業銀行' },
  { id: 23, text: '103-臺灣新光商業銀行' },
  { id: 24, text: '108-陽信商業銀行' },
  { id: 25, text: '118-板信商業銀行' },
  { id: 26, text: '147-三信商業銀行' },
  { id: 27, text: '803-聯邦商業銀行' },
  { id: 28, text: '805-遠東國際商業銀行' },
  { id: 29, text: '806-元大商業銀行' },
  { id: 30, text: '807-永豐商業銀行' },
  { id: 31, text: '808-玉山商業銀行' },
  { id: 32, text: '809-凱基商業銀行' },
  { id: 33, text: '810-星展(台灣)商業銀行' },
  { id: 34, text: '812-台新國際商業銀行' },
  { id: 35, text: '816-安泰商業銀行' },
  { id: 36, text: '822-中國信託商業銀行' },
  { id: 37, text: '823-將來商業銀行' },
  { id: 38, text: '824-連線商業銀行' },
  { id: 39, text: '826-樂天國際商業銀行' },
  { id: 40, text: '104-台北市第五信用合作社' },
  { id: 41, text: '114-基隆第一信用合作社' },
  { id: 42, text: '115-基隆市第二信用合作社' },
  { id: 43, text: '119-淡水第一信用合作社' },
  { id: 44, text: '120-新北市淡水信用合作社' },
  { id: 45, text: '124-宜蘭信用合作社' },
  { id: 46, text: '127-桃園信用合作社' },
  { id: 47, text: '130-新竹第一信用合作社' },
  { id: 48, text: '132-新竹第三信用合作社' },
  { id: 49, text: '146-台中市第二信用合作社' },
  { id: 50, text: '158-彰化第一信用合作社' },
  { id: 51, text: '161-彰化第五信用合作社' },
  { id: 52, text: '162-彰化第六信用合作社' },
  { id: 53, text: '163-彰化第十信用合作社' },
  { id: 54, text: '165-彰化縣鹿港信用合作社' },
  { id: 55, text: '178-嘉義市第三信用合作社' },
  { id: 56, text: '188-臺南第三信用合作社' },
  { id: 57, text: '204-高雄市第三信用合作社' },
  { id: 58, text: '215-花蓮第一信用合作社' },
  { id: 59, text: '216-花蓮第二信用合作社' },
  { id: 60, text: '222-澎湖縣第一信用合作社' },
  { id: 61, text: '223-澎湖第二信用合作社' },
  { id: 62, text: '224-金門縣信用合作社' },
];


const filteredBanks = computed(() => {
  if (!state.activeBank.trim()) {
    return bankList;
  }
  return bankList.filter(item =>
    item.text.includes(state.activeBank.trim())
  )
})



const hideBankList = () => {
  if (state.showBankList == true) {
    state.showBankList = false
  }
}

const selectBank = (id, text) => {
  bankForm.bank = id;
  state.activeBank = text;
  state.showBankList = false
}


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
    bankForm.bankBook1 = compressedFile
  }

  if (side == "back") {
    if (state.previewUrls[1]) URL.revokeObjectURL(state.previewUrls[1])
    state.previewUrls[1] = URL.createObjectURL(compressedFile)
    bankForm.bankBook2 = compressedFile
  }
}


const submitForm = async () => {
  if (!bankForm.title) {
    common.alert("fail", "請填寫帳戶名稱")
    return
  }

  if (!bankForm.bank) {
    common.alert("fail", "請選擇銀行名稱")
    return
  }

  if (!bankForm.branch) {
    common.alert("fail", "請填寫分行名稱")
    return
  }

  if (!bankForm.branch_code) {
    common.alert("fail", "請填寫分行代碼")
    return
  }

  if (!bankForm.account) {
    common.alert("fail", "請填寫銀行帳號")
    return
  }

  if (!bankForm.bankBook1 || !bankForm.bankBook2) {
    common.alert("fail", "請上傳存摺所有圖片")
    return
  }

  let FF = new FormData()
  FF.append("UserBankForm[title]", bankForm.title)
  FF.append("UserBankForm[bank]", bankForm.bank)
  FF.append("UserBankForm[branch]", bankForm.branch)
  FF.append("UserBankForm[branch_code]", bankForm.branch_code) // 分行代碼
  FF.append("UserBankForm[account]", bankForm.account)
  FF.append("bankBook1", bankForm.bankBook1)
  FF.append("bankBook2", bankForm.bankBook2)

  common.loading = true
  try {
    const res = await common.baseAjaxImage("POST", "/user/bank", FF)
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

const checkBankAccount = async () => {
  try {
    const res = await common.baseAjax("POST", "/user/bank")
    if (res.code == 1) {
      state.addAccountMode = true
      state.bankListMode = true
    } else {
      state.addAccountMode = false
      state.bankListMode = false
      common.userController(res.code, res.msg)  
    }
  } catch (error) {
    common.catchError(error)
  }
}
</script>


<template>
  <div class="bankaccount-wrapper">
    <div class="main">
      <HeaderCross text="設定銀行帳戶" />
      <div class="top">
        <div
          class="content"
          v-if="state.initDone && !state.addAccountMode && !state.bankListMode"
        >
          <div
            class="no-data"
            v-if="!state.accountExist"
          >
            <van-image :src="noData" />
            <span>尚無新增銀行帳戶</span>
          </div>
          <div
            class="update-gray-box"
            @click="checkBankAccount()"
          >
            <span>新增銀行帳戶</span>
          </div>
          <p
            style="height: 1px; background-color: rgb(46, 49, 52); margin-top: 19px;">
          </p>
        </div>

        <!-- 銀行帳戶列表 -->
        <div
          class="content"
          v-if="!state.addAccountMode && state.bankListMode"
        >
          <div class="bank-list-item" v-for="item in state.bankList" :key="item.id">
            <div class="bank-list-item-content">
              <div class="bank-list-item-content-item leading-4">
                <span class="mr-1">帳戶名稱:</span>
                <span class="text-[14px]">{{ item.title }}</span>
              </div>
              <div class="bank-list-item-content-item leading-4">
                <span class="mr-1">銀行名稱:</span>
                <span class="text-[14px]">{{ item.bank }}</span>
              </div>
              <div class="bank-list-item-content-item leading-4">
                <span class="mr-1">分行名稱:</span>
                <span class="text-[14px]">{{ item.branch }}</span>
              </div>
              <div class="bank-list-item-content-item leading-4">
                <span class="mr-1">分行代碼:</span>
                <span class="text-[14px]">{{ item.branch_code }}</span>
              </div>
              <div class="bank-list-item-content-item leading-4">
                <span class="mr-1">銀行帳號:</span>
                <span class="text-[14px]">{{ item.account }}</span>
              </div>
            </div>
          </div>
        </div>


        <!-- 新增銀行帳戶 (KYC) -->
        <div
          class="content"
          v-if="state.addAccountMode"
        >
          <form>
            <div class="form-item">
              <h4>銀行帳戶名稱</h4>
              <van-field
                :placeholder="`填寫帳戶名稱`"
                v-model="bankForm.title"
              />
            </div>
            <div class="form-item">
              <h4>銀行名稱</h4>
              <van-field
                :placeholder="`選擇銀行`"
                v-on:blur="hideBankList()"
                right-icon="arrow-up"
                @click-right-icon=""
                @click-input="state.showBankList = true"
                v-model="state.activeBank"
                @input="state.showBankList = true"
              />
              <div
                class="bankList-wrapper"
                :class="state.showBankList ? '' : 'hide'"
              >

                <div
                  v-if="filteredBanks.length > 0"
                  class="bankListItem"
                  v-for="item in filteredBanks"
                  @pointerdown.prevent="selectBank(item.id, item.text)"
                >{{ item.text }}
                </div>
                <div
                  v-else
                  class="bankListItem"
                >-- 無符合條件的銀行名稱 --
                </div>
              </div>
            </div>
            <div class="form-item">
              <h4>銀行分行名稱</h4>
              <van-field
                :placeholder="`填寫分行名稱`"
                v-model="bankForm.branch"
              />
            </div>
            <div class="form-item">
              <h4>銀行分行代碼</h4>
              <van-field
                :placeholder="`填寫分行代碼`"
                v-model="bankForm.branch_code"
              />
            </div>
            <div class="form-item">
              <h4>銀行帳號</h4>
              <van-field v-model="bankForm.account" />
            </div>
            <div class="form-item">
              <h4>上傳圖片</h4>
              <div class="note-upload">
                <van-icon name="warning" />
                <span> 僅支援 png、jpg，檔案上限 5MB</span>
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
                >存摺正面
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
                >存摺反面</label>
                <input
                  id="upload-file-1"
                  type="file"
                  accept="image/*"
                  hidden
                  @change="e => beforeUpload(e, 'back')"
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
            @click="state.addAccountMode = false"
          >
            <span>取消</span>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>


<style lang="scss" scoped>
.bankaccount-wrapper {
  height: 100%; 
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
}


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

.van-cell:after {
  display: none;
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
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--glass-border);
    box-shadow: var(--card-glow);
    border-radius: .21333rem;
    transition: all 0.3s ease;

    .no-data {
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      -webkit-justify-content: center;
      align-items: center;
      -webkit-align-items: center;
      flex-direction: column;
      -webkit-flex-direction: column;
      flex-wrap: nowrap;
      -webkit-flex-wrap: nowrap;

      .van-image {
        margin-top: 1.1467rem;
        width: 2.1333rem;
        height: 1.8713rem;
      }

      span {
        margin-top: .35rem;
      }
    }
  }


  .top .content {
    display: flex;
    flex-direction: column;
    color: var(--font-color);
    position: relative;
    padding-top: .5rem;

    .bankList-wrapper {
      border: 2px solid var(--border-input);
      width: 100%;
      max-height: 5rem;
      z-index: 2;
      background-color: var(--bg-color);
      border-radius: 5px;
      position: absolute;
      top: 4.8rem;
      display: flex;
      flex-direction: column;
      padding: 10px;
      overflow-x: auto;
    }

    .hide {
      display: none;
    }

    .bankList-wrapper .bankListItem {
      width: 100%;
      line-height: 1rem;
    }

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
      margin-top: .2rem;
      gap: .3rem;
      flex-wrap: wrap;

      .file-upload-item {
        width: 48%;
      }
    }

    .upload-btn {
      display: flex; 
      height: 2.5rem;
      border: var(--border-dashed);
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
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
        font-size: .42667rem;
        font-style: normal;
        font-weight: 650;
        line-height: normal;
      }
    }
  }


  .bottom {
    margin: .373rem .32rem .32rem .32rem;
    padding: .5rem .35rem .3467rem;
    background: var(--bg-light-color);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--glass-border);
    box-shadow: var(--card-glow);
    border-radius: .21333rem;
    transition: all 0.3s ease;

    .note {
      :deep(.wrapper .article) {
        padding-left: 15px;
      }

      font-weight: 300;
    }

    :deep(ol) {
      list-style: decimal;
    }

    :deep(ol > li) {
      margin-top: 10px;
    }

    :deep(ul) {
      list-style-type: disc;
      padding-left: 10px;
    }

    :deep(li) {
      line-height: 25px;
    }
  }
}
</style>
