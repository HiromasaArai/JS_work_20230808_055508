
// let 変数名 = document.querySelector('セレクタ式');
// 変数名.addEventListener('イベント', function(){
//     処理;
// }, false);

/** * name属性値 */
const RADIO_NAME = 'data_seq';
/** * id属性値 編集ボタン */
const ROW_EDIT_BTN_ID = 'rowEditBtn';
/** * id属性値 上移動ボタン */
const ROW_UPPER_BTN_ID = 'rowUpperBtn';
/** * id属性値 下移動ボタン */
const ROW_DOWNER_BTN_ID = 'rowDownerBtn';
/** * id属性値 確定ボタン */
const OK_BTN_ID = 'okBtn';
/** * id属性値 キャンセルボタン */
const CANCEL_BTN_ID = 'cancelBtn';

/**
 * チェックされているラジオボタン要素を取得
 * @param {string} name radioのname属性値
 * @return result
 */
function getRadioElem(name) {
  let result = '';
  let elemList = document.querySelectorAll(`input[type='radio'][name='${name}']`);

  // ラジオボタンを走査し、チェック状態にあるかどうかを確認
  for (let elem of elemList) {
    // チェックされている項目を取得
    if (elem.checked) {
      result = elem;
      break;
    }
  }
  return result;
}

/**
 * 指定のラジオボタングループの活性/非活性をスイッチする
 * @param {string} radioName radioグループのname属性値
 * @param {boolean} isRadioDisabled 活性/非活性（trueの場合は非活性である）
 * @return なし
 */
function disabledRadioSwitch(radioName, isRadioDisabled) {
  let radioBtns = document.querySelectorAll(`input[type='radio'][name='${radioName}']`);
  for (let targetRadio of radioBtns) {
    targetRadio.disabled = isRadioDisabled;
  }
}

/**
 * 渡された文字列が空文字だとエラーメッセージを返す。
 * rtnObj.result: Boolean （※引数が空文字だとfalse）
 * rtnObj.errMsg: string （※引数が空文字だとエラーメッセージ）
 * @param {string} inputText 列1のユーザー入力値です。
 * @return {rtnObj} 戻り値オブジェクトです。
 */
function emptyVaridation(inputText) {
  rtnObj = { result: true, errMsg: '' };
  if (inputText === '') {
    rtnObj.result = false;
    rtnObj.errMsg = '値が入力されておりません。確認して下さい。'
  }
  return rtnObj;
}

/**
 * ラジオボタン「data_seq」のいずれかがチェックON/OFFされたときのイベントリスナー
 */
function goRadioChangeDataSeq() {
  let radioBtns = document.querySelectorAll(`input[type='radio'][name='${RADIO_NAME}']`);
  for (let targetRadio of radioBtns) {
    targetRadio.addEventListener(`change`, () => {
      // 活性化
      document.getElementById(ROW_EDIT_BTN_ID).removeAttribute("disabled");
      document.getElementById(ROW_UPPER_BTN_ID).removeAttribute("disabled");
      document.getElementById(ROW_DOWNER_BTN_ID).removeAttribute("disabled");
      // document.getElementById(ROW_EDIT_BTN_ID).setAttribute("disabled", true);

      // チェックされているラジオボタン要素を取得
      let checkedRadioElem = getRadioElem(RADIO_NAME);
      let colElem = checkedRadioElem.parentElement.parentElement;
      let msg = "";

      let col1 = colElem.children[1].firstChild.nextSibling;
      let col2 = colElem.children[2].firstChild.nextSibling;

      // let col1 = checkedRadioElem.parentElement;
      msg += `列1：初期値：${col1.defaultValue}\n`;
      msg += `列1：入力値：${col1.value}\n`;
      msg += `列2：初期値：${col2.defaultValue}\n`;

      // alert(msg);

    });
  }
}

/**
 * 「キャンセル」ボタンと「確定」ボタンの共通処理
 */
function goCancelOrOkCommon() {
  // ボタンをhidden付与
  document.getElementById(OK_BTN_ID).hidden = true;
  document.getElementById(CANCEL_BTN_ID).hidden = true;

  // ボタンをhiddenリムーブ
  document.getElementById(ROW_EDIT_BTN_ID).hidden = false;
  document.getElementById(ROW_UPPER_BTN_ID).hidden = false;
  document.getElementById(ROW_DOWNER_BTN_ID).hidden = false;

  // 指定のラジオボタングループを活性化
  disabledRadioSwitch(RADIO_NAME, false);

  // チェックドなラジオボタンに紐づく列1のinput type="text"を非活性化
  let checkedRadioElem = getRadioElem(RADIO_NAME);
  let colElem = checkedRadioElem.parentElement.parentElement;
  let col1 = colElem.children[1].firstChild.nextSibling;
  col1.disabled = true;
}


// ラジオボタン「data_seq」のいずれかがチェックON/OFFされたときのイベントリスナー
goRadioChangeDataSeq();

// 編集ボタン押下時
document.getElementById(ROW_EDIT_BTN_ID).addEventListener('click', function () {
  // ボタンをhidden付与
  document.getElementById(ROW_EDIT_BTN_ID).hidden = true;
  document.getElementById(ROW_UPPER_BTN_ID).hidden = true;
  document.getElementById(ROW_DOWNER_BTN_ID).hidden = true;

  // ボタンをhiddenリムーブ
  document.getElementById(OK_BTN_ID).hidden = false;
  document.getElementById(CANCEL_BTN_ID).hidden = false;

  // 指定のラジオボタングループを非活性化
  disabledRadioSwitch(RADIO_NAME, true);

  // チェックドなラジオボタンに紐づく列1のinput type="text"を活性化
  let checkedRadioElem = getRadioElem(RADIO_NAME);
  let colElem = checkedRadioElem.parentElement.parentElement;
  let col1 = colElem.children[1].firstChild.nextSibling;
  col1.disabled = false;
}, false);

// 確定ボタン押下
document.getElementById(OK_BTN_ID).addEventListener('click', function () {
  let checkedRadioElem = getRadioElem(RADIO_NAME);
  let colElem = checkedRadioElem.parentElement.parentElement;
  let col1 = colElem.children[1].firstChild.nextSibling;
  let resultObj = emptyVaridation(col1.value);

  if (resultObj.result) {
    goCancelOrOkCommon();
  } else {
    alert(resultObj.errMsg);
  }

}, false);

// キャンセルボタン押下
document.getElementById(CANCEL_BTN_ID).addEventListener('click', function () {
  goCancelOrOkCommon();
  location.reload();
}, false);


