function sendMail() {
    let params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
    }
    emailjs.send("service_do953jm", "template_4oj2koc", params).then(alert("تم الإرسال بنجاح!"));
}