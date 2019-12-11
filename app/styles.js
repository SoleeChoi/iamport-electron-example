import { Form } from 'antd';
import styled from 'styled-components';

export const FormContainer = styled(Form)`
  &&& {
    padding: 3rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    /* GO BACK BUTTON */
    .anticon.anticon-swap-left {
      color: #333;
      position: absolute;
      top: 1rem;
      left: 3rem;
      font-size: 5rem;
    }
    /* RADIO GROUP */
    .ant-radio-group {
      label {
        padding: 0 3rem;
        height: 4rem;
        line-height: 4rem;
        font-size: 1.4rem;
      }
    }

    /* LABEL */
    .ant-form-item-label label,
    span.ant-form-text {
      color: white;
      font-size: 1.6rem;
      padding-right: 0;
    }
    span.ant-form-text.function {
      color: #79b6f2;
    }
    span.ant-form-text.keyword {
      color: #c5a5c5;
    }

    /* INPUT */
    .ant-input-disabled {
      background-color: #ccc;
    }
  }

  h1 {
    font-weight: bold;
    text-align: center;
    font-size: 2.6rem;
  }

  p {
    white-space: pre-line;
    margin: 0 0 3rem 0;
    line-height: 1.5;
  }

  .ant-row {
    display: flex;
    align-items: flex-start;
    color: white;
    font-size: 1.6rem;
    .ant-form-item-children {
      display: flex;
      align-items: center;
    }
    label {
      color: white;
      font-size: 1.6rem;
    }
  }
  .ant-form-item-required::before,
  .ant-row.without-colon .ant-form-item-label > label::after {
    display: none;
  }

  /* has error */
  .has-error .ant-input {
    border-color: #fc929e;
  }
  .has-error .ant-form-explain {
    margin-top: 0.5rem;
    opacity: 0.8;
    color: #fc929e;
  }
`;

export const CodeContainer = styled.div`
  background-color: #333;
  padding: 3rem 5rem;
  border-radius: 1rem;
  margin-bottom: 3rem;
  width: 800px;
  position: relative;

  /* SET DEFAULT BUTTON*/
  button {
    position: absolute;
    top: 2rem;
    right: 2rem;
    z-index: 1;
  }
`;

export const DataContainer = styled.div`
  padding: 0 3rem;
  .ant-row {
    margin-bottom: ${props => (props.twoDepth ? '0' : '0.5rem')};
  }
  &&& {
    .ant-form-item-label label,
    span.ant-form-text {
      color: #8dc891;
    }

    .ant-row.callback .ant-col {
      width: 100%;
      textarea {
        padding: 6px 11px;
        font-size: 16px;
      }
    }
  }
`;

export const ErrorContainer = styled.div`
  background-color: ${props => (props.success ? '#f6ffed' : '#fff1f0')};
  border-color: ${props => (props.success ? '#b7eb8f' : '#ffa39e')};
  border-width: 1px;
  border-radius: 1rem;
  border-style: solid;
  padding: 3rem;
  margin-bottom: 2rem;
  font-size: 1.2rem;
  white-space: pre-line;
  width: 800px;
  position: relative;

  .anticon {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 2rem;
  }
`;

export const ButtonContainer = styled.div`
  text-align: center;

  /* BUTTONS */
  button {
    height: 4rem;
    width: 12rem;
    margin: 0 0.5rem;
    font-size: 1.4rem;
  }
`;
