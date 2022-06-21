import styled from "styled-components";

export const StyleContainer = styled.div`
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "1%")};
  margin-bottom: ${(props) => (props.marginBotton ? props.marginBotton : "0%")};
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : "5%")};
  margin-right: ${(props) => (props.marginRight ? props.marginRight : "5%")};
  padding-left: ${(props) => (props.paddingLeft ? props.paddingLeft : "1%")};
  padding-right: ${(props) => (props.paddingRight ? props.paddingRight : "1%")};
  padding-top: ${(props) => (props.paddingTop ? props.paddingTop : "1%")};
  padding-bottom: ${(props) =>
    props.paddingBottom ? props.paddingBottom : "1%"};
  overflow: ${(props) => (props.overflow ? props.overflow : "hidden")};
  background-color: rgba(255, 255, 255, 0.788);
  border-radius: 20px;

  /* transition: 1s; */

  /* &:hover {
    width: 120px;
    height: 120px;
  }
  */

  @media (max-width: 1500px) {
    margin: 1% 0% 0% 1%;
    border-radius: 0px;
  }
`;
