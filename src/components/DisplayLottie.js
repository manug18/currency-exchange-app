import React, { Component, Suspense } from "react";
import Lottie from "react-lottie";

export default class DisplayLottie extends Component {
  render() {
    const animationData = this.props.animationData;
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
    };
    const centerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft:'500px',
        paddingTop:'180px'
      };

    return (
        <div style={centerStyle}>        <Lottie options={defaultOptions} isClickToPauseDisabled={true} />
        </div>
    );
  }
}
