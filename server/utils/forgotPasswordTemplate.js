const forgotPasswordTemplate = ({ name, otp }) => {
  const imgBase = "https://adityasharma3010.github.io/svg-test";
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Your Password – Binkeyit</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'Segoe UI',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:30px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

          <!-- ── ILLUSTRATION AREA ── -->
          <tr>
            <td align="center" style="background:#d6f0e0;padding:30px 20px 24px;">
              <img src="${imgBase}/image-1.png" alt="OTP Verification" width="200" style="display:block;margin:0 auto;max-width:200px;"/>
            </td>
          </tr>

          <!-- ── BODY ── -->
          <tr>
            <td style="padding:32px 40px 10px;">
              <p style="margin:0 0 4px;font-size:15px;color:#555;">Hi <strong style="color:#1a1a1a;">${name}</strong>,</p>
              <h2 style="margin:0 0 16px;font-size:22px;font-weight:800;color:#1a1a1a;">Your one-time code is</h2>

              <!-- Single OTP box -->
              <table cellpadding="0" cellspacing="0" style="margin:0 auto 16px;">
                <tr>
                  <td>
                    <div style="border:2px solid #cccccc;border-radius:6px;padding:14px 36px;font-size:34px;font-weight:800;color:#1a1a1a;letter-spacing:8px;text-align:center;">
                      ${otp}
                    </div>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 24px;font-size:13px;color:#777;text-align:center;">
                Please verify you're really you by entering this<br/>
                6-digit code for resetting your password. Just a heads up, this code will expire<br/>
                in <strong style="color:#1a1a1a;">1 hour</strong> for security reasons.
              </p>

              <!-- "We noticed" section -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td style="background:#f9f9f9;border-radius:8px;padding:18px 20px;">
                    <p style="margin:0 0 16px;font-size:15px;font-weight:800;color:#1a1a1a;text-align:center;">
                      We noticed you signed in from a<br/>new location or device
                    </p>

                    <!-- Icon row -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <!-- Device -->
                        <td align="center" width="33%" style="padding:8px 6px;">
                          <img src="${imgBase}/image-2.png" alt="Device" width="40" style="display:block;margin:0 auto;"/>
                          <div style="font-size:13px;font-weight:700;color:#1a1a1a;margin-top:6px;">Device</div>
                          <div style="font-size:12px;color:#777;margin-top:2px;">This Browser</div>
                        </td>
                        <!-- Location -->
                        <td align="center" width="33%" style="padding:8px 6px;">
                          <img src="${imgBase}/image-3.png" alt="Location" width="40" style="display:block;margin:0 auto;"/>
                          <div style="font-size:13px;font-weight:700;color:#1a1a1a;margin-top:6px;">Location</div>
                          <div style="font-size:12px;color:#777;margin-top:2px;">India</div>
                        </td>
                        <!-- Date -->
                        <td align="center" width="33%" style="padding:8px 6px;">
                          <img src="${imgBase}/image-4.png" alt="Date" width="40" style="display:block;margin:0 auto;"/>
                          <div style="font-size:13px;font-weight:700;color:#1a1a1a;margin-top:6px;">Date</div>
                          <div style="font-size:12px;color:#777;margin-top:2px;">${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ── FOOTER ── -->
          <tr>
            <td style="border-top:1px solid #eee;padding:20px 40px;text-align:center;">
              <p style="margin:0 0 4px;font-size:13px;color:#999;">
                If you have any questions, contact our
                <a href="mailto:support@binkeyit.com" style="color:#2DB44A;text-decoration:none;font-weight:600;">Website Guides</a>.
              </p>
              <p style="margin:0 0 10px;font-size:13px;color:#999;">
                Or, visit our <a href="#" style="color:#2DB44A;text-decoration:none;font-weight:600;">Help Center</a>.
              </p>
              <p style="margin:0;font-size:12px;color:#bbb;">
                &copy; ${new Date().getFullYear()} Binkeyit. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `;
};

export default forgotPasswordTemplate;
