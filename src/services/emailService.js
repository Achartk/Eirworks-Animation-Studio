import emailjs from '@emailjs/browser';

/**
 * Layanan Pengiriman Email OTP menggunakan EmailJS
 */
export const sendVerificationCode = async (email, code) => {
  const serviceID = 'service_xohamom';
  const templateID = 'template_iven6sl';
  const publicKey = 'Jum0kUGG1XwNNV-yM';

  try {
    // Kita mengirimkan berbagai parameter berjaga-jaga template pengguna menggunakan variabel berbeda
    const templateParams = {
      to_email: email,
      to_name: 'Admin Eirworks',
      message: `Kode Verifikasi 2FA Anda adalah: ${code}. Jangan bagikan kode ini kepada siapa pun.`,
      otp_code: code,
      code: code
    };

    const response = await emailjs.send(serviceID, templateID, templateParams, publicKey);
    
    console.log('Email sukses terkirim!', response.status, response.text);
    return { success: true, message: 'Kode berhasil dikirim ke email Anda!' };
    
  } catch (err) {
    console.error('Gagal mengirim email:', err);
    // Mengambil pesan error detail dari object EmailJS (biasanya di err.text atau err.message)
    const errorDetail = err.text || err.message || JSON.stringify(err);
    return { success: false, message: `Error EmailJS: ${errorDetail}` };
  }
}

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
