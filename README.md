launchrock-https-flask
======================
This project is to support https for launchrock using proxy server. The proxy server is written in flask.

This Project also tested on heroku as they provide https support on herokuapp.com's subdomain for free.

#Installation

Clone repository
> git clone https://github.com/gagandeep/launchrock-https-flask.git

Go to folder of launchrock-https-flask,
>  cd launchrock-https-flask

Install virtualenv for this to work,
> virtualenv venv

Now activate virtual environment just created,
> source venv/bin/activate

Install project requirements,
> pip install -r requirements.txt

#####Modify files for your specific need,
Change flask_web.py, near  the end,
> http://aftercoupon.launchrock.com/ to your launchrock project url.

Change templates/widget.html
```
<div id="lr-widget" rel="CFKVB8Z9"></div>
```
to
```
<div id="lr-widget" rel="<<your launchrock project number>>"></div>
```

**How to get your launchrock project number?**
Select widget as your project type in Domain tab, you will find it.
After getting lauchrock project number, You could later change your project type to whatever you feel is good for you.

Run project
> python flask_web.py

Open browser and point to http://localhost:5000

####Following step is specific to deploy solution to Heroku, could be skipped if not deploying on Heroku
TODO

###ToDo
- Config file to configure all the manual changes of code
