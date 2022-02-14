import PropTypes from "prop-types";
import React from "react";
//import styled from "styled-components/native";
import { Text, TouchableOpacity } from "react-native";
import {
  //StyledButton,
  StyledButtonLink
 // StyledText,
  //StyledTextLink,
  //StyledTextWrapper
} from "./styledComponents";

//import getStyles from "./ButtonStyles";
// export const RoundedButton = styled(Button)`
//   border-radius: 40px;
// `;

// export function RoundedButtonOutlined(props) {
//   const {
//     buttonLinkStyle,
//     children,
//     text,
//     icon,
//     onPress,
//     textLinkStyle,
//     textProps,
//     underlineText,
//     theme,
//     ...restProps
//   } = props;
//   const styles = getStyles(theme);
//   return (
//     <TouchableOpacity style={styles.addButton} onPress={onPress}>
//       {icon}
//       <Text style={styles.buttonText}> {text}</Text>
//     </TouchableOpacity>
//   );
// }

export function ButtonLink(props) {
    const {
      buttonLinkStyle,
      children,
      text,
      textLinkStyle,
      textProps,
      underlineText,
      ...restProps
    } = props;
  
    return (
      <StyledButtonLink {...restProps} >
      </StyledButtonLink>
    );
  }




//Mynit original implementation 
// export function ButtonLink(props) {
//   const {
//     buttonLinkStyle,
//     children,
//     text,
//     textLinkStyle,
//     textProps,
//     underlineText,
//     ...restProps
//   } = props;

//   return (
//     <StyledButtonLink {...restProps} buttonLinkStyle={buttonLinkStyle}>
//       {children || (
//         <StyledTextLink
//           textLinkStyle={textLinkStyle}
//           underlineText={underlineText}
//           {...textProps}
//         >
//           {text}
//         </StyledTextLink>
//       )}
//     </StyledButtonLink>
//   );
// }

ButtonLink.propTypes = {
  buttonLinkStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  children: PropTypes.node,
  text: PropTypes.string,
  textLinkStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  textProps: PropTypes.shape({}),
  underlineText: PropTypes.bool,
  useLighterBg: PropTypes.bool
};

ButtonLink.defaultProps = {
  buttonLinkStyle: {},
  children: null,
  text: "",
  textLinkStyle: {},
  textProps: {},
  underlineText: true,
  useLighterBg: false
};

// function Button(props) {
//   const {
//     buttonStyle,
//     children,
//     icon,
//     text,
//     textProps,
//     textStyle,
//     textWrapperStyle,
//     ...restProps
//   } = props;

//   return (
//     <StyledButton {...restProps} buttonStyle={buttonStyle}>
//       {children || (
//         <StyledTextWrapper textWrapperStyle={textWrapperStyle}>
//           {icon}
//           <StyledText textStyle={textStyle} {...textProps}>
//             {text}
//           </StyledText>
//         </StyledTextWrapper>
//       )}
//     </StyledButton>
//   );
// }

// Button.propTypes = {
//   buttonStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
//   children: PropTypes.node,
//   icon: PropTypes.node,
//   text: PropTypes.string,
//   textProps: PropTypes.shape({}),
//   textStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
//   textWrapperStyle: PropTypes.oneOfType([
//     PropTypes.shape({}),
//     PropTypes.string
//   ]),
//   useLighterBg: PropTypes.bool
// };

// Button.defaultProps = {
//   buttonStyle: {},
//   icon: null,
//   children: null,
//   text: "",
//   textProps: {},
//   textStyle: {},
//   textWrapperStyle: {},
//   useLighterBg: false
// };

// export default Button;