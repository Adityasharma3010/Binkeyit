const verifyEmailTemplate = ({ name, url, createdAt }) => {
  const created = createdAt ? new Date(createdAt) : new Date();
  const formattedDate = (() => {
    try {
      return created.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch (e) {
      return `${created.toDateString()} ${created.toLocaleTimeString()}`;
    }
  })();
  const year = new Date().getFullYear();

  return `
  <div style="margin:0; padding:0; background-color:#f5f5f5; font-family:'Segoe UI', Arial, sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5; padding:40px 0;">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:20px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.08); max-width:550px; width:100%;">
          
          <!-- Header / Logo Band -->
          <tr>
            <td align="center" style="background-color:#FFC500; padding:28px 40px;">
              <span style="font-size:32px; font-weight:900; color:#000; letter-spacing:-1px; font-family:'Segoe UI', Arial, sans-serif;">
                Binkey<span style="color:#10B981;">it</span>
              </span>
            </td>
          </tr>

          <!-- Heading -->
          <tr>
            <td align="center" style="padding:24px 40px 10px;">
              <h1 style="margin:0; font-size:24px; font-weight:800; color:#111111; letter-spacing:-0.5px;">
                Verify Your Email Account
              </h1>
            </td>
          </tr>

          <!-- Body Text -->
          <tr>
            <td align="center" style="padding:10px 48px 28px;">
              <p style="margin:0; font-size:15px; color:#666666; line-height:1.7; text-align:center;">
                Hi <strong style="color:#111;">${name}</strong>, thanks for signing up with Binkeyit!<br>
                Please confirm your email address to activate your account and start shopping.
              </p>
              <p style="margin:10px 0 0;font-size:13px;color:#000;text-align:center;">
                Account registered: <strong>${formattedDate}</strong>
              </p>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td align="center" style="padding:0 40px 40px;">
              <a href="${url}"
                style="display:inline-block; background:#10B981; color:#ffffff; text-decoration:none;
                       font-size:16px; font-weight:700; padding:14px 36px; border-radius:999px;
                       letter-spacing:0.3px;">
                Confirm Your Email
              </a>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <hr style="border:none; border-top:1px solid #f0f0f0; margin:0;">
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:20px 40px;">
              <p style="margin:0; font-size:12px; color:#aaaaaa; line-height:1.6;">
                If you didn't create an account with Binkeyit, you can safely ignore this email.<br>
                This link will expire in 24 hours.
              </p>
            </td>
          </tr>

          <!-- Bottom accent bar -->
          <tr>
            <td style="background:#FFC500; height:auto;padding:12px 40px;">
            <p style="font-size:13px;color:#3c4043;text-align:center;">
                © ${year} Binkeyit. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
  </div>
`;
  //   return `
  // <p>Dear ${name},</p>
  // <p>Thank you for registering Binkeyit.</p>
  // <a href=${url} style="background:#e8f1ff; color:#2d6bff; border:1px solid #cbdcff; padding:12px 24px; text-decoration:none; border-radius:999px; font-size:15px; font-weight:600; display:inline-block; margin:10px 0 0">
  //   Verify Email
  // </a>
  // `;
};

export default verifyEmailTemplate;
