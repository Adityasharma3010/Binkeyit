const verifyEmailTemplate = ({ name, url }) => {
  return `
<p>Dear ${name},</p>
<p>Thank you for registering Binkeyit.</p>
<a href=${url} style="background:#e8f1ff; color:#2d6bff; border:1px solid #cbdcff; padding:12px 24px; text-decoration:none; border-radius:999px; font-size:15px; font-weight:600; display:inline-block; margin:10px 0 0">
  Verify Email
</a>
`;
};

export default verifyEmailTemplate;
