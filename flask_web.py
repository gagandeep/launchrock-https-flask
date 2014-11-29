from flask import Flask, json
from flask import render_template
from flask import request
from flask import Response
import requests

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 1024*1024*1024


def handleError(e):
    logging.error(e)

def getSecuredContent(request, name):
    try:
        result = urllib2.urlopen("http://"+name).read()
        return HttpResponse(result, mimetype='application/javascript')
    except urllib2.URLError, e:
        handleError(e)

def getSecuredJSONContent(request, name):
    try:
        full_path = request.get_full_path()
        lr_path = full_path[10:]
        full_uri = lr_url + lr_path
        result = urllib2.urlopen(full_uri).read()
        return Response(result, mimetype='application/javascript')
    except urllib2.URLError, e:
        handleError(e)

@app.route("/")
def proxy():
    return render_template("widget.html")


@app.route("/json/<path:path>", methods=['GET', 'POST'])
def jsonproxy(path):
	if request.method == "POST":
		r = requests.post("http://"+path, data=request.form, headers=request.headers)
		return Response(r.content.replace("http:\/\/","\/\/"),  mimetype='application/json')
	else:
		r = requests.get("http://"+path, headers=request.headers)
		return r.content.replace("http:\/\/","\/\/")
	return ","+path+request.method+"".join(request.headers.values())


@app.route("/javascript/<path:path>", methods=['GET', 'POST'])
def jsproxy(path):

	if request.method == "POST":
		r = requests.post("http://"+path, data=request.form, headers=request.headers)
		return Response(r.content.replace("//platform.launchrock.com/v1/","//mobiledealcafe.herokuapp.com/json/platform.launchrock.com/v1/"),  mimetype='application/javascript')
	else:
		print path
		print request.headers
		r = requests.get("http://"+path)
		print path[-4:]
		if path[-4:] == ".css":
			return Response(r.content.replace("//platform.launchrock.com/v1/","//mobiledealcafe.herokuapp.com/json/platform.launchrock.com/v1/"),mimetype="text/css")
		else:
			return Response(r.content.replace("//platform.launchrock.com/v1/","//mobiledealcafe.herokuapp.com/json/platform.launchrock.com/v1/"),mimetype="application/javascript")

@app.route("/<path:path>", methods=['GET'])
def imgproxy(path):
	if request.method == "POST":
		r = requests.post("http://ignition.launchrock.com/"+path, data=request.form, headers=request.headers)
		return Response(r.content.replace("//platform.launchrock.com/v1/","//mobiledealcafe.herokuapp.com/json/platform.launchrock.com/v1/"),  mimetype='application/javascript')
	else:
		print path
		print request.headers
		r = requests.get("http://aftercoupon.launchrock.com/"+path)
		print r.content
		return Response(r.content, mimetype="image/png")

if __name__ == "__main__":
	app.debug = True
	app.run()
