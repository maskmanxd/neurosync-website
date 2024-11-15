$(document).ready(function () {

    // Function to send email when the form is submitted
    $('#appointment-form').submit(function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data using FormData API
        const formData = new FormData(this);

        // Format the email content
        let emailContent = `
        Patient's Info:
        - Name: ${formData.get('patient_name')}
        - Email: ${formData.get('patient_email')}
        - Phone: ${formData.get('patient_phone')}
        - Country: ${formData.get('patient_country')}
        - Address: ${formData.get('patient_address')}
        - Apt/Suite/Other: ${formData.get('patient_address_ext')}
        - City: ${formData.get('patient_city')}
        - State: ${formData.get('patient_state')}
        - Postal Code: ${formData.get('patient_postal')}
        - Date of Birth: ${formData.get('patient_dob')}
        
        Referring Provider's Info:
        - Name: ${formData.get('provider_name')}
        - Email: ${formData.get('provider_email')}
        - Phone: ${formData.get('provider_phone')}
        - Address: ${formData.get('provider_address')}
        - Fax: ${formData.get('provider_fax')}
        
        - Reason for Referral:
        ${formData.get('referral_reason')}
        
        - Additional Notes:
        ${formData.get('add_note')}`;


        // Send email using EmailJS
        emailjs.send("", "", {
            from_name: 'NeuroSync Website',
            reply_to: formData.get('provider_email'),
            message_html: emailContent
        })
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Email sent successfully!');
                // Optional: Clear form fields after successful submission
                $('#appointment-form')[0].reset();
            }, function (error) {
                console.error('FAILED...', error);
                alert('Failed to send email. Please try again later.');
            });
    });
});
