This project requires 3 components.<br />
-redis (queue)<br />
-mongodb<br />
-nestJS<br />

1. start redis (provided installed redis before<br />
  redis-server<br />

2. start mongodb(provided installed mongodb before)<br />
  sudo mongod<br />

3. start nodeJS application<br />
  nest start<br />

4. Template Email JSON supported<br />
{
	"form_emails": ["alex_giggslam@hotmail.com", "stefanlam.1011@gmail.com"],
	"follow_up_emails": ["alex_giggslam@hotmail.com", "alex_giggslam@hotmail.com", "stefanlam.1011@gmail.com"],
	"subject":"TEST",
	"html": "123"
}
<br /><br />
5. Comments / Remark<br /><br />
-This project using queue from library bull. In order to send email efficiently. Once API called, it will return success to the client while background is processing follow up emails and form emails sending.
<br /><br />
-This template can be customized enhanced again using table row concept. Input JSON can be included such as array type of content and position to be more customization.
<br /><br />
-This template can be enhanced with attachment but short of time.
<br /><br />
6. http:/localhost:3000/mail/send<br />
API URL
<br /><br />
7. This project using helmet and rate limiting for security purpose.
<br /><br />
8. This project using logger to track logging purpose.
<br /><br />
9. Sample screen shot can be provided in screenshot folder for references.
<br />
