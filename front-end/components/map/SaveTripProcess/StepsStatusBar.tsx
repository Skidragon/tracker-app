import {Steps, Card, Button} from "antd";
import styled from "styled-components";

const Step = Steps.Step;

interface Props {
  step: number;
  setStep: Function;
}
const StepsWrapper = styled.div`
  position: absolute;
  z-index: 10000000;
  left: 3%;
  top: 22%;
`;
const StepButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ExitBtn = styled(Button)`
  display: ${(props: {step: number}) =>
    props.step === 0 ? "flex" : "none"};
`;
const PreviousBtn = styled(Button)`
  display: ${(props: {step: number}) =>
    props.step > 0 ? "flex" : "none"};
`;
const NextBtn = styled(Button)`
  display: flex;
`;

const StepsStatusBar: React.SFC<Props> = ({step, setStep}) => {
  if (step === -1) {
    return null;
  } else {
    return (
      <StepsWrapper>
        <Card>
          <Steps direction="vertical" current={step}>
            <Step
              title="Go to location"
              description="The location needs to be visible before taking snapshot."
            />
            <Step
              title="Take Snapshot"
              description="Creates a desired location image for trip."
            />
            <Step
              title="Finish Trip"
              description="Fill out the rest of the details then save."
            />
          </Steps>
          <StepButtonGroup>
            <ExitBtn step={step} type="danger" onClick={() => setStep(-1)}>
              Exit
            </ExitBtn>
            <PreviousBtn
              step={step}
              onClick={() => setStep((prevState: number) => prevState - 1)}
              disabled={step === 0 ? true : false}
            >
              Previous
            </PreviousBtn>
            <NextBtn
              step={step}
              type="primary"
              onClick={() => setStep((prevState: number) => prevState + 1)}
              disabled={step > 2 ? true : false}
            >
              {step >= 2 ? "Done" : "Next"}
            </NextBtn>
          </StepButtonGroup>
        </Card>
      </StepsWrapper>
    );
  }
};

export default StepsStatusBar;
