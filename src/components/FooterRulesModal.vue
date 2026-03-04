<script setup>
import { inject } from "vue";

const common = inject("common");
</script>

<template>
  <div class="footerRulesModal text-[10px]">
    <van-popup
      v-model:show="common.showFooterRules"
      :style="{ width: '100%', height: '80%', background: 'var(--bg-color)', margin: '0 auto' }"
      position="center"
      closeable
    >
      <div class="p-3 h-full overflow-y-auto text-[14px]">
        <div v-show="common.footerRulesType === 'Footer-FAQ'" class="space-y-2">
          <div class="text-[16px] font-bold text-[var(--font-color,#333)]">常見問題</div>
          <div class="space-y-4 leading-relaxed text-[var(--font-color,#333)]">
            <div class="space-y-2">
              <p class="font-semibold">一、帳戶與註冊</p>
              <p><span class="font-medium">Q：</span>註冊帳戶需要提供哪些資料？</p>
              <p class="ml-4"><span class="font-medium">A：</span>會員註冊僅需基本聯絡資訊。為確保資金安全，平台在特定情況下可能要求身份驗證，以保障會員權益與防止冒用帳戶。</p>
              <p><span class="font-medium">Q：</span>可以擁有多個帳戶嗎？</p>
              <p class="ml-4"><span class="font-medium">A：</span>每位會員僅限註冊一個帳戶。若發現重複帳戶，平台有權合併或凍結帳戶以維護公平性。</p>
            </div>
            <div class="space-y-2">
              <p class="font-semibold">二、存款與出款</p>
              <p><span class="font-medium">Q：</span>存款多久會入帳？</p>
              <p class="ml-4"><span class="font-medium">A：</span>一般情況下，存款會在確認後立即入帳。若遇系統維護或銀行延遲，可能需稍作等待。</p>
              <p><span class="font-medium">Q：</span>出款需要多久？</p>
              <p class="ml-4"><span class="font-medium">A：</span>平台在完成安全審核後，通常於申請後一定時間內處理出款。實際到帳時間依銀行與支付管道而定。</p>
              <p><span class="font-medium">Q：</span>為什麼需要進行出款審核？</p>
              <p class="ml-4"><span class="font-medium">A：</span>出款審核是為了確保資金安全、防止詐騙與帳戶冒用，同時符合平台風控機制。</p>
            </div>
            <div class="space-y-2">
              <p class="font-semibold">三、遊戲與結果</p>
              <p><span class="font-medium">Q：</span>遊戲結果是否公平？</p>
              <p class="ml-4"><span class="font-medium">A：</span>平台與多家國際遊戲供應商合作，所有遊戲皆由系統生成結果並經測試認證，確保公平與透明。</p>
              <p><span class="font-medium">Q：</span>如果遊戲斷線怎麼辦？</p>
              <p class="ml-4"><span class="font-medium">A：</span>若遊戲中斷，系統會自動保存當前狀態並依最終紀錄結算。會員可聯繫客服查詢詳情。</p>
            </div>
            <div class="space-y-2">
              <p class="font-semibold">四、安全與隱私</p>
              <p><span class="font-medium">Q：</span>我的資料會被公開嗎？</p>
              <p class="ml-4"><span class="font-medium">A：</span>平台嚴格保護會員隱私，所有資料皆經加密處理，僅用於帳戶安全與服務需求。</p>
              <p><span class="font-medium">Q：</span>如何保護帳戶安全？</p>
              <div class="ml-4">
                <p><span class="font-medium">A：</span>建議會員：</p>
                <ul class="ml-6 mt-1 list-disc space-y-1">
                  <li>不與他人共用帳號</li>
                  <li>定期更換密碼</li>
                  <li>避免使用公共裝置登入</li>
                </ul>
              </div>
            </div>
            <div class="space-y-2">
              <p class="font-semibold">五、負責任博彩</p>
              <p><span class="font-medium">Q：</span>如果我想暫停遊戲，可以怎麼做？</p>
              <p class="ml-4"><span class="font-medium">A：</span>會員可聯繫客服申請帳戶暫停或冷靜期，平台將協助限制登入與遊戲權限。</p>
              <p><span class="font-medium">Q：</span>平台是否提供遊戲限制工具？</p>
              <p class="ml-4"><span class="font-medium">A：</span>平台支援存款限制、帳戶暫停與自我排除機制，以協助會員維持理性娛樂。</p>
            </div>
          </div>
        </div>
        <div v-show="common.footerRulesType === 'ResponsibleGambling'" class="space-y-2">
          <div class="text-[16px] font-bold text-[var(--font-color,#333)]">負責任博彩</div>
          <div class="space-y-4 leading-relaxed text-[var(--font-color,#333)]">
            <p>VIC 致力於推動理性娛樂與負責任博彩文化。我們相信，博彩應該是一種娛樂體驗，而非財務壓力來源。</p>
            <div class="space-y-2">
              <p class="font-semibold">1. 理性娛樂原則</p>
              <p class="ml-4">我們鼓勵所有玩家：</p>
              <ul class="ml-6 list-disc space-y-1">
                <li>僅使用可負擔的娛樂預算進行遊戲</li>
                <li>避免因情緒或壓力而下注</li>
                <li>避免追逐損失或借貸下注</li>
                <li>將博彩視為娛樂，而非投資或收入來源</li>
              </ul>
            </div>
            <div class="space-y-2">
              <p class="font-semibold">2. 玩家自我管理工具</p>
              <p class="ml-4">為協助玩家維持健康遊戲習慣，VIC 提供：</p>
              <ul class="ml-6 list-disc space-y-1">
                <li>帳戶暫停（冷靜期）申請</li>
                <li>自我排除機制</li>
              </ul>
              <p class="ml-4">如玩家認為自身博彩行為已影響生活，建議立即暫停遊戲並尋求專業協助。</p>
            </div>
            <div class="space-y-2">
              <p class="font-semibold">3. 未成年保護政策</p>
              <p class="ml-4">VIC 嚴格禁止未滿 18 歲人士註冊與遊戲。任何涉及未成年帳戶將被立即凍結並終止服務。</p>
            </div>
          </div>
        </div>
        <div v-show="common.footerRulesType === 'Footer-TermsOfService'" class="space-y-2">
          <div class="text-[16px] font-bold text-[var(--font-color,#333)]">服務條款</div>
          <div class="space-y-4 leading-relaxed text-[var(--font-color,#333)]">
            <p>歡迎使用 VIC 線上娛樂平台。當您註冊帳戶並使用本平台服務，即表示您同意遵守以下條款。</p>
            <div class="space-y-2">
              <p class="font-semibold">1. 帳戶使用規範</p>
              <ul class="ml-6 list-disc space-y-1">
                <li>每位會員僅可註冊一個帳戶</li>
                <li>禁止使用他人身份資料註冊</li>
                <li>禁止轉讓、出售或共用帳戶</li>
              </ul>
              <p class="ml-4">若發現違規，平台有權暫停或終止帳戶。</p>
            </div>
            <div class="space-y-2">
              <p class="font-semibold">2. 遊戲公平與結果</p>
              <p class="ml-4">所有遊戲結果皆由系統與遊戲供應商產生，玩家同意以系統紀錄為最終依據。平台保留因系統錯誤、異常下注或技術問題而取消或調整注單之權利。</p>
            </div>
            <div class="space-y-2">
              <p class="font-semibold">3. 出入金與風控</p>
              <p class="ml-4">為確保平台安全與反詐騙機制：</p>
              <ul class="ml-6 list-disc space-y-1">
                <li>平台可要求會員進行身份驗證</li>
                <li>異常資金流動將進行審查</li>
                <li>涉及非法活動之帳戶將立即凍結</li>
              </ul>
            </div>
            <div class="space-y-2">
              <p class="font-semibold">4. 條款修訂</p>
              <p class="ml-4">VIC 保留隨時修改服務條款之權利。修訂後條款將於網站公告後立即生效。</p>
            </div>
          </div>
        </div>
        <div v-show="common.footerRulesType === 'Footer-PrivacyPolicy-text'" class="space-y-2">
          <div class="text-[16px] font-bold text-[var(--font-color,#333)]">隱私政策</div>
          <div class="space-y-4 leading-relaxed text-[var(--font-color,#333)]">
            <p>VIC 重視每位會員的資料安全與隱私權。我們採用多層防護與加密技術確保資料安全。</p>
            <div class="space-y-2">
              <p class="font-semibold">1. 資料收集目的</p>
              <p class="ml-4">平台收集會員資料僅用於：</p>
              <ul class="ml-6 list-disc space-y-1">
                <li>帳戶建立與身份驗證</li>
                <li>資金交易與安全控管</li>
                <li>客服支援與系統優化</li>
                <li>法規遵循與防詐騙措施</li>
              </ul>
            </div>
            <div class="space-y-2">
              <p class="font-semibold">2. 資料保護措施</p>
              <ul class="ml-6 list-disc space-y-1">
                <li>採用加密傳輸與資料儲存技術</li>
                <li>限制授權人員存取會員資料</li>
                <li>定期進行安全審查與風控監測</li>
              </ul>
            </div>
            <div class="space-y-2">
              <p class="font-semibold">3. 資料分享原則</p>
              <p class="ml-4">VIC 不會出售或公開會員資料。僅在以下情況可能提供：</p>
              <ul class="ml-6 list-disc space-y-1">
                <li>法律要求或監管機構調查</li>
                <li>反詐騙或資安防護需求</li>
                <li>支付與身份驗證合作單位</li>
              </ul>
            </div>
            <div class="space-y-2">
              <p class="font-semibold">4. 會員權利</p>
              <p class="ml-4">會員可申請：</p>
              <ul class="ml-6 list-disc space-y-1">
                <li>查詢個人資料</li>
                <li>更新或更正資料</li>
                <li>申請帳戶刪除</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
