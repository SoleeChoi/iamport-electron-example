// @flow
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

import routes from '../constants/routes';

export default function HomePage() {
  return (
    <Container>
      <Tag>
        {`
          프로젝트 버전: v0.9.0
          아임포트 SDK 버전: v1.1.7
        `}
      </Tag>
      <h1>아임포트 테스트</h1>
      <p>
        {`
          아임포트 결제 또는 본인인증 테스트 프로그램입니다.\n
          아래 버튼을 눌러 테스트를 진행해주세요.
        `}
      </p>
      <BoxContainer>
        <Box to={routes.PAYMENT}>
          <Icon type="credit-card" />
          결제
        </Box>
        <Box to={routes.CERTIFICATION}>
          <Icon type="user" />
          본인인증
        </Box>
      </BoxContainer>
    </Container>
  );
}

const Container = styled.div`
  background-color: #344e81;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1 {
    color: #fff;
    font-size: 2.4rem;
    font-weight: bold;
    margin-bottom: 0;
  }
  p {
    color: #fff;
    white-space: pre;
    text-align: center;
    margin: 0;
    line-height: 1;
    font-weight: lighter;
    font-size: 1.2rem;
  }
`;

const BoxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
`;

const Box = styled(Link)`
  background-color: #fff;
  border-radius: 3px;
  width: 200px;
  height: 130px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 0 10px;
  font-size: 1.2rem;
  color: #333;

  .anticon {
    font-size: 2rem;
  }
`;

const Tag = styled.p`
  &&& {
    white-space: pre-line;
    position: absolute;
    top: 3rem;
    right: 3rem;
    color: #fff;
    line-height: 1.5;
    text-align: right;
  }
`;
