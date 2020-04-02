// @flow
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, Input, Icon, Radio, Button } from 'antd';

import {
  FormContainer,
  CodeContainer,
  DataContainer,
  ErrorContainer,
  ButtonContainer
} from '../styles';

const { Item } = Form;
const { TextArea } = Input;

const MODES = {
  payment: '일반결제',
  subscription: '정기결제'
};

function PaymentPage({ form, history }) {
  const [mode, setMode] = useState('payment');
  const [isDefault, setIsDefault] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [result, setResult] = useState();

  const { getFieldDecorator, validateFieldsAndScroll, setFieldsValue } = form;

  function handleSubmit(e) {
    e.preventDefault();

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        const { IMP } = window;
        const { userCode } = values;
        setIsOver(false);

        IMP.init(userCode);

        const data = {};
        Object.keys(values).forEach(key => {
          switch (key) {
            case 'userCode':
            case 'callback':
              break;
            case 'card_quota':
              data.display = {
                card_quota: values[key].replace(/\s/g, '').split(',')
              };
              break;
            default:
              data[key] = values[key];
              break;
          }
        });
        IMP.request_pay(data, response => {
          window.eval(values.callback);
          callback(response);
        });
      }
    });
  }

  function callback(response) {
    let resultToString = '';
    const keys = Object.keys(response);
    const keysLength = keys.length;
    keys.forEach((key, index) => {
      const value = response[key];
      if (typeof value === 'string') {
        resultToString += `'${key}': '${response[key]}'`;
      } else {
        resultToString += `'${key}': ${response[key]}`;
      }

      if (index !== keysLength - 1) {
        resultToString += `,\n`;
      }
    });

    setResult(resultToString);
    setIsSuccess(response.success);
    setIsOver(true);
  }

  function onChangeMode(e) {
    const { target } = e;
    const { value } = target;

    const values = {};
    if (value === 'payment') {
      values.amount = isDefault ? '1000' : undefined;
    } else {
      values.amount = '0';
      values.customer_uid = isDefault
        ? `cid_${new Date().getTime()}`
        : undefined;
    }
    setFieldsValue(values);

    setMode(value);
  }

  function setDefaultValues() {
    const values = {
      userCode: 'iamport',
      pg: 'html5_inicis',
      pay_method: 'card',
      name: '아임포트 일렉트론 테스트',
      tax_Free: '0',
      merchant_uid: `mid_${new Date().getTime()}`,
      buyer_name: '홍길동',
      buyer_tel: '01012341234',
      buyer_email: 'example@example.com',
      buyer_addr: '신사동 661-16',
      buyer_postcode: '06018'
    };

    if (mode === 'payment') {
      values.amount = '1000';
    } else {
      values.amount = '0';
      values.customer_uid = `cid_${new Date().getTime()}`;
    }
    setFieldsValue(values);
    setIsDefault(true);
  }

  function initializeValues() {
    const values = {
      userCode: undefined,
      pg: undefined,
      pay_method: undefined,
      name: undefined,
      amount: mode === 'subscription' ? '0' : undefined,
      customer_uid: undefined,
      tax_Free: undefined,
      merchant_uid: undefined,
      buyer_name: undefined,
      buyer_tel: undefined,
      buyer_email: undefined,
      buyer_addr: undefined,
      buyer_postcode: undefined
    };
    setFieldsValue(values);
    setIsDefault(false);
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Link to="/home">
        <Icon type="swap-left" />
      </Link>
      <h1>결제 테스트</h1>
      <Radio.Group value={mode} size="large" onChange={onChangeMode}>
        {Object.keys(MODES).map(key => (
          <Radio.Button value={key} key={key}>
            {MODES[key]}
          </Radio.Button>
        ))}
      </Radio.Group>
      {mode === 'payment' ? (
        <p>
          {`
            [테스트 불가 케이스]

            KCP: 에스크로
            이니시스: 에스크로
            카카오페이: KB국민카드
            다날: 가상계좌, 실시간 계좌이체, 에스크로
            나이스: NH농협카드, KB국민카드(이상 카드결제), KT(휴대폰 소액결제)
          `}
        </p>
      ) : (
        <p>
          {`
            [테스트 불가 케이스]

            이니시스: 맥OS(보안모듈 설치 불가)
            KB국민카드, NH농협카드, 카카오뱅크 등 국민카드 계열
          `}
        </p>
      )}
      <CodeContainer>
        {isDefault ? (
          <Button ghost type="danger" size="large" onClick={initializeValues}>
            기본값 취소
          </Button>
        ) : (
          <Button type="danger" size="large" onClick={setDefaultValues}>
            기본값 적용
          </Button>
        )}
        <Item label="IMP." className="without-colon">
          <span className="ant-form-text function">init</span>
          <span className="ant-form-text">(&apos;</span>
          {getFieldDecorator('userCode', {
            rules: [
              {
                required: true,
                message: '가맹점 식별코드는 필수입력입니다'
              }
            ]
          })(<Input size="large" placeholder="가맹점 식별코드" />)}
          <span className="ant-form-text">&apos;);</span>
        </Item>
        <span className="ant-form-text">IMP.</span>
        <span className="ant-form-text function">request_pay</span>
        <span className="ant-form-text">{`({`}</span>
        <DataContainer>
          <Item label="pg">
            {getFieldDecorator('pg')(
              <Input size="large" placeholder="PG사 코드" />
            )}
            <span className="ant-form-text">,</span>
          </Item>
          <Item label="pay_method">
            {getFieldDecorator('pay_method')(
              <Input size="large" placeholder="결제수단 코드" />
            )}
            <span className="ant-form-text">,</span>
          </Item>
          <Item label="name">
            {getFieldDecorator('name')(
              <Input size="large" placeholder="주문명" />
            )}
            <span className="ant-form-text">,</span>
          </Item>
          <Item label="amount">
            {getFieldDecorator('amount', {
              rules: [
                {
                  required: true,
                  message: '결제금액은 필수입력입니다'
                }
              ]
            })(
              <Input
                size="large"
                placeholder="결제금액"
                disabled={mode === 'subscription'}
              />
            )}
            <span className="ant-form-text">,</span>
          </Item>
          <Item
            label="customer_uid"
            style={{ display: mode === 'subscription' ? 'flex' : 'none' }}
          >
            {getFieldDecorator('customer_uid', {
              rules: [
                {
                  required: mode === 'subscription',
                  message: '정기결제시 customer_uid는 필수입력입니다'
                }
              ]
            })(<Input size="large" placeholder="정기결제용 ID" />)}
            <span className="ant-form-text">,</span>
          </Item>
          <Item label="tax_free">
            {getFieldDecorator('tax_free')(
              <Input size="large" placeholder="면세공급가액" />
            )}
            <span className="ant-form-text">,</span>
          </Item>
          <Item label="currency">
            {getFieldDecorator('currency')(
              <Input size="large" placeholder="화폐단위" />
            )}
            <span className="ant-form-text">,</span>
          </Item>
          <Item label="language">
            {getFieldDecorator('language')(
              <Input size="large" placeholder="결제창 언어 코드" />
            )}
            <span className="ant-form-text">,</span>
          </Item>
          <Item label="merchant_uid">
            {getFieldDecorator('merchant_uid')(
              <Input size="large" placeholder="주문번호" />
            )}
            <span className="ant-form-text">,</span>
          </Item>
          <Item label="buyer_name">
            {getFieldDecorator('buyer_name')(
              <Input size="large" placeholder="구매자 이름" />
            )}
            <span className="ant-form-text">,</span>
          </Item>
          <Item label="buyer_tel">
            {getFieldDecorator('buyer_tel')(
              <Input size="large" placeholder="구매자 전화번호" />
            )}
            <span className="ant-form-text">,</span>
          </Item>
          <Item label="buyer_email">
            {getFieldDecorator('buyer_email')(
              <Input size="large" placeholder="구매자 이메일" />
            )}
            <span className="ant-form-text">,</span>
          </Item>
          <Item label="buyer_addr">
            {getFieldDecorator('buyer_addr')(
              <Input size="large" placeholder="구매자 주소" />
            )}
            <span className="ant-form-text">,</span>
          </Item>
          <Item label="buyer_postcode">
            {getFieldDecorator('buyer_postcode')(
              <Input size="large" placeholder="구매자 우편번호" />
            )}
            <span className="ant-form-text">,</span>
          </Item>
          <Item label="notice_url">
            {getFieldDecorator('notice_url')(
              <Input size="large" placeholder="Notificatin URL" />
            )}
            <span className="ant-form-text">,</span>
          </Item>
          <Item label="custom_data">
            {getFieldDecorator('custom_data')(
              <Input size="large" placeholder="임의 지정 데이터" />
            )}
            <span className="ant-form-text">,</span>
          </Item>
          {mode === 'payment' && (
            <>
              <Item label="escrow">
                {getFieldDecorator('escrow')(
                  <Input size="large" placeholder="에스크로 여부" />
                )}
                <span className="ant-form-text">,</span>
              </Item>
              <Item label="digital">
                {getFieldDecorator('digital')(
                  <Input size="large" placeholder="실물컨텐츠 여부" />
                )}
                <span className="ant-form-text">,</span>
              </Item>
              <Item label="vbank_due">
                {getFieldDecorator('vbank_due')(
                  <Input size="large" placeholder="가상계좌 입금기한" />
                )}
                <span className="ant-form-text">,</span>
              </Item>
              <Item label="biz_num">
                {getFieldDecorator('biz_num')(
                  <Input size="large" placeholder="사업자번호" />
                )}
                <span className="ant-form-text">,</span>
              </Item>
              <span className="ant-form-text">{`display: {`}</span>
              <DataContainer twoDepth>
                <Item label="card_quota">
                  {getFieldDecorator('card_quota')(
                    <Input size="large" placeholder="할부개월수" />
                  )}
                  <span className="ant-form-text">,</span>
                </Item>
              </DataContainer>
              <span className="ant-form-text">{`},`}</span>
            </>
          )}
        </DataContainer>
        <span className="ant-form-text">{`},\b\b`}</span>
        <span className="ant-form-text keyword">function</span>
        <span className="ant-form-text">{`(response) {`}</span>
        <DataContainer>
          <Item className="callback">
            {getFieldDecorator('callback')(
              <TextArea rows={5} placeholder="콜백함수" />
            )}
          </Item>
        </DataContainer>
        <span className="ant-form-text">{`});`}</span>
      </CodeContainer>
      {isOver && (
        <ErrorContainer success={isSuccess}>
          <span>{`{`}</span>
          <DataContainer>{result}</DataContainer>
          <span>{`}`}</span>
          <Icon type="close-circle" onClick={() => setIsOver(false)} />
        </ErrorContainer>
      )}
      <ButtonContainer>
        <Button size="large" onClick={() => history.push('/home')}>
          돌아가기
        </Button>
        <Button type="primary" htmlType="submit" size="large">
          결제하기
        </Button>
      </ButtonContainer>
    </FormContainer>
  );
}

PaymentPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func,
    validateFieldsAndScroll: PropTypes.func,
    setFieldsValue: PropTypes.func
  }).isRequired
};

export default Form.create()(PaymentPage);
