// @flow
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, Input, Icon, Button } from 'antd';

import {
  FormContainer,
  CodeContainer,
  DataContainer,
  ErrorContainer,
  ButtonContainer
} from '../styles';

const { Item } = Form;
const { TextArea } = Input;

function CertificationPage({ form, history }) {
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
            default:
              data[key] = values[key];
              break;
          }
        });

        IMP.certification(data, response => {
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

  function setDefaultValues() {
    const values = {
      userCode: 'imp10391932',
      merchant_uid: `mid_${new Date().getTime()}`,
      company: 'SIOT',
      carrier: 'KTF',
      name: '홍길동',
      phone: '01012345678',
      birth: '20111111'
    };
    setFieldsValue(values);
    setIsDefault(true);
  }

  function initializeValues() {
    const values = {
      userCode: undefined,
      merchant_uid: undefined,
      company: undefined,
      carrier: undefined,
      name: undefined,
      phone: undefined,
      birth: undefined
    };
    setFieldsValue(values);
    setIsDefault(false);
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Link to="/home">
        <Icon type="swap-left" />
      </Link>
      <h1>본인인증 테스트</h1>
      <p>
        {`
          아임포트 휴대폰 본인인증은 다날 PG사로만 이용 가능합니다.
          통신사 정책상 실 모드에서만 테스트 가능합니다.
        `}
      </p>
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
        <span className="ant-form-text function">certification</span>
        <span className="ant-form-text">{`({`}</span>
        <DataContainer>
          <Item label="merchant_uid">
            {getFieldDecorator('merchant_uid')(
              <Input size="large" placeholder="주문번호" />
            )}
            <span className="ant-form-text">,</span>
          </Item>
          <Item label="company">
            {getFieldDecorator('company')(
              <Input size="large" placeholder="회사명" />
            )}
            <span className="ant-form-text">,</span>
          </Item>
          <Item label="carrier">
            {getFieldDecorator('carrier')(
              <Input size="large" placeholder="통신사" />
            )}
            <span className="ant-form-text">,</span>
          </Item>
          <Item label="name">
            {getFieldDecorator('name')(
              <Input size="large" placeholder="이름" />
            )}
            <span className="ant-form-text">,</span>
          </Item>
          <Item label="phone">
            {getFieldDecorator('phone')(
              <Input size="large" placeholder="전화번호" />
            )}
            <span className="ant-form-text">,</span>
          </Item>
          <Item label="birth">
            {getFieldDecorator('birth')(
              <Input size="large" placeholder="생년월일(YYYYMMDD)" />
            )}
            <span className="ant-form-text">,</span>
          </Item>
          <Item label="min_age">
            {getFieldDecorator('min_age')(
              <Input size="large" placeholder="허용최소연령" />
            )}
            <span className="ant-form-text">,</span>
          </Item>
        </DataContainer>
        <span className="ant-form-text">{`},\b\b`}</span>
        <span className="ant-form-text keyword">function</span>
        <span className="ant-form-text">{`(response) {`}</span>
        <DataContainer>
          <Item className="callback">
            {getFieldDecorator('callback')(
              <TextArea rows={10} placeholder="콜백함수" />
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
          본인인증 하기
        </Button>
      </ButtonContainer>
    </FormContainer>
  );
}

CertificationPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func,
    validateFieldsAndScroll: PropTypes.func,
    setFieldsValue: PropTypes.func
  }).isRequired
};

export default Form.create()(CertificationPage);
