import {Col, Alert, Space, Typography} from 'antd';
import {useEffect} from 'react';
import {
  getCurrentChainId,
  getCurrentStepIdForCurrentChain,
  useGlobalState,
} from 'context';
import {useIdx} from '@figment-ceramic/context/idx';

const {Text} = Typography;

const LogIn = () => {
  const {state, dispatch} = useGlobalState();
  const chainId = getCurrentChainId(state);
  const stepId = getCurrentStepIdForCurrentChain(state);

  const {isAuthenticated, currentUserDID} = useIdx();

  useEffect(() => {
    if (currentUserDID) {
      dispatch({
        type: 'SetStepIsCompleted',
        chainId,
        stepId,
        value: true,
      });
    }
  }, [currentUserDID]);

  return (
    <Col style={{minHeight: '350px', maxWidth: '600px'}}>
      <Space direction="vertical" size="large">
        {isAuthenticated && currentUserDID ? (
          <Alert
            message={
              <div>
                You are logged in. Your DID is:
                <Text code>{currentUserDID}</Text>
              </div>
            }
            type="success"
            showIcon
          />
        ) : (
          <Alert
            message="You are not logged in. Please click Log In button."
            type="error"
            showIcon
          />
        )}
      </Space>
    </Col>
  );
};

export default LogIn;
