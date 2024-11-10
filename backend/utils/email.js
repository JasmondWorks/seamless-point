const nodemailer = require("nodemailer");
const { htmlToText } = require("html-to-text");
const path = require("path");
const ejs = require("ejs");

class Email {
  constructor(user) {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    this.user = user;
  }

  async send({ file, subject, body = {} }) {
    const html = await ejs.renderFile(
      path.join(__dirname, "../emails", `${file}.ejs`),
      {
        otp: body.otp,
        url: body.resetUrl,
        firstName: this.user.firstName,
      }
    );

    try {
      await this.transporter.sendMail({
        from: "noreply <seamlesspoint.est.24@gmail.com",
        to,
        subject,
        text,
        html,
      });
      console.log("Message sent");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to the Payup Family 🎉");
  }

  async sendDeliveryComplete() {
    // Call the generic send method
    await this.send({ file: "complete", subject: "Delivery Completed" });
  }
  async sendDeliveryFailed() {
    // const subject = "Delivery Failed";
    // const text = "Unfortunately, we could not complete your delivery.";
    // const html = "<b>Unfortunately, we could not complete your delivery.</b>";

    // // Call the generic send method
    // await this.send({ to, subject, text, html });

    await this.send({
      file: "failed",
      subject: "Delivery Failed",
    });
  }

  async sendDeliveryOngoing() {
    // const subject = "Delivery Ongoing";
    // const text = "Your delivery has been assigned a driver.";
    // const html = "<b>Your delivery has been assigned a driver.</b>";

    // // Call the generic send method
    // await this.send({ to, subject, text, html });

    await this.send({
      file: "ongoing",
      subject: "Delivery Ongoing",
    });
  }

  async sendResetToken(resetUrl) {
    await this.send({
      file: "reset",
      subject: "Reset Password",
      body: { resetUrl },
    });
  }
}

module.exports = Email;
