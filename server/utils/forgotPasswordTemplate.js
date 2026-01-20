const forgotPasswordTemplate = ({ name, otp }) => {
  return `
<div>
    <p>Hi ${name},</p>
  <p>Your OTP for forgot password is
    <span style="color:#50C878; background:#fff; font-weight: 800; font-size: 15px; padding:2px 6px; border-radius:4px;">${otp}</span>.
    It is valid for 1 hour.
  </p>
  <p>Please use this OTP to reset your password. If you did not request a password reset, please ignore this email.</p>
  <p>For security reasons, do not share this OTP with anyone.</p>
  <br />
  <p>Regards,</p>
  <p>Binkeyit Team</p>
</div>
    `;
};

export default forgotPasswordTemplate;
