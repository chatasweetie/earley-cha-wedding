"""Wedding Website"""
import os
from jinja2 import StrictUndefined

from flask import Flask, render_template, request, redirect
from flask_debugtoolbar import DebugToolbarExtension
from flask import send_from_directory

from datetime import datetime


app = Flask(__name__)

# Required t,l.o use Flask sessions and the debug toolbar
app.config['SECRET_KEY'] = os.environ.get("FLASK_SECRET_KEY", "abcdef")


# Make Jinja2 to raise an error instead of failing sliently
app.jinja_env.undefined = StrictUndefined


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static', 'img'),
                               'favicon.ico', mimetype='image/png')


@app.route("/")
def index():
    """Homepage"""
    year = datetime.now().year

    if year > 2016:
        year = '2016 - {}'.format(year)
        

    return render_template("homepage.html", year=year)

@app.route("/gallery")
def gallery():
    """Gallery"""

    return render_template("gallery.html")


@app.route("/rsvp", methods=["POST"])
def process_rsvp():
    """recieves the rsvp data"""

    pass
    # needs to process rsvp



############################################################################
# Error Pages
@app.errorhandler(404)
def page_not_found(error):
    """404 Page Not Found handling"""

    return render_template('/errors/404.html'), 404


@app.errorhandler(500)
def internal_error(error):
    # db.session.rollback()
    """500 Error handling """

    return render_template('/errors/500.html'), 500



if __name__ == "__main__":

    app.debug = False

    # connect_to_db(app)

    # Use the DebugToolbar
    DebugToolbarExtension(app)

    app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

    DEBUG = "NO_DEBUG" not in os.environ
    PORT = int(os.environ.get("PORT", 5000))

    app.run(host="0.0.0.0", port=PORT, debug=DEBUG)
