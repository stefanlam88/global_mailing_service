This project requires 3 components.
-redis (queue)
-mongodb
-nestJS

1. start redis (provided installed redis before
  redis-server

2. start mongodb(provided installed mongodb before)
  sudo mongod

3. start nodeJS application
  nest start

4. Template Email JSON supported
{
	"form_emails": ["alex_giggslam@hotmail.com", "stefanlam.1011@gmail.com"],
	"follow_up_emails": ["alex_giggslam@hotmail.com", "alex_giggslam@hotmail.com", "stefanlam.1011@gmail.com"],
	"subject":"TEST",
	"html": "123"
}

5. Comments / Remark
-This project using queue from library bull. In order to send email efficiently. Once API called, it will return success to the client while background is processing follow up emails and form emails sending.

-This template can be customized enhanced again using table row concept. Input JSON can be included such as array type of content and position to be more customization.

-This template can be enhanced with attachment but short of time.

6. http:/localhost:3000/mail/send
API URL

7. This project using helmet and rate limiting for security purpose.

8. This project using logger to track logging purpose.

9. Sample screen shot can be provided in screenshot folder for references.
