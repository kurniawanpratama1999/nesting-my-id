export const otpRegex=(otp)=> {
    const regex = /^[a-zA-Z0-9]{6,10}$/;
    return regex.test(otp);
}
