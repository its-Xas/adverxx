4. Follow the setup instructions for your chosen provider
5. Note down your **Service ID**

### Step 3: Create Email Template
1. Go to "Email Templates" in your EmailJS dashboard
2. Click "Create New Template"
3. Use this template structure:

```
Subject: New Portfolio Inquiry from {{from_name}}

Hello,

You have received a new inquiry through your portfolio website.

Name: {{from_name}}
Email: {{from_email}}
Project Type: {{project_type}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Save the template and note down your **Template ID**

### Step 4: Get Public Key
1. Go to "Account" in your EmailJS dashboard
2. Find your **Public Key** in the API Keys section

### Step 5: Update the Code
1. Open `src/components/Contact.tsx`
2. Replace the simulation code in the `handleSubmit` function with:

```typescript
import emailjs from '@emailjs/browser';

// In the handleSubmit function, replace the try block with:
try {
  const templateParams = {
    from_name: formData.name,
    from_email: formData.email,
    project_type: formData.projectType,
    message: formData.message,
  };

  await emailjs.send(
    'YOUR_SERVICE_ID',    // Replace with your Service ID
    'YOUR_TEMPLATE_ID',   // Replace with your Template ID
    templateParams,
    'YOUR_PUBLIC_KEY'     // Replace with your Public Key
  );
  
  // Rest of the success handling code...
}
```

### Step 6: Test the Form
1. Fill out the contact form on your website
2. Check your email inbox for the message
3. Verify all form fields are properly populated

## 🎨 Error Handling

The portfolio now includes a sophisticated notification system:
- **Success Messages**: Green notifications for successful actions
- **Error Messages**: Red notifications for errors with helpful descriptions
- **Auto-dismiss**: Notifications automatically disappear after 5 seconds
- **Manual Close**: Users can close notifications manually
- **Stacked Display**: Multiple notifications stack vertically
- **Smooth Animations**: Fade-in animations for professional appearance