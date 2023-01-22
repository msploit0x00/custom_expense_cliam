# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from . import __version__ as app_version

app_name = "custom_expense_cliam"
app_title = "Custom Expense Cliam"
app_publisher = "Peter Maged"
app_description = "Expense Cliam multiCurrency"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "eng.peter.maged@gmail.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/custom_expense_cliam/css/custom_expense_cliam.css"
# app_include_js = "/assets/custom_expense_cliam/js/custom_expense_cliam.js"

# include js, css files in header of web template
# web_include_css = "/assets/custom_expense_cliam/css/custom_expense_cliam.css"
# web_include_js = "/assets/custom_expense_cliam/js/custom_expense_cliam.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "custom_expense_cliam/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "custom_expense_cliam.install.before_install"
# after_install = "custom_expense_cliam.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "custom_expense_cliam.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"custom_expense_cliam.tasks.all"
# 	],
# 	"daily": [
# 		"custom_expense_cliam.tasks.daily"
# 	],
# 	"hourly": [
# 		"custom_expense_cliam.tasks.hourly"
# 	],
# 	"weekly": [
# 		"custom_expense_cliam.tasks.weekly"
# 	]
# 	"monthly": [
# 		"custom_expense_cliam.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "custom_expense_cliam.install.before_tests"

# Overriding Methods
# ------------------------------
#
override_whitelisted_methods = {
	"erpnext.hr.doctype.expense_claim.expense_claim.get_expense_claim": "custom_expense_cliam.custom_expense_cliam.doctype.expense_claim.expense_claim.get_expense_claim"
}
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "custom_expense_cliam.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]
doctype_js = {
    "Expense Claim" : "custom_expense_cliam/doctype/expense_claim/expense_claim.js",
    }
override_doctype_class = {
	"Expense Claim": "custom_expense_cliam.custom_expense_cliam.doctype.expense_claim.expense_claim.ExpenseClaim"
}

# User Data Protection
# --------------------

user_data_fields = [
	{
		"doctype": "{doctype_1}",
		"filter_by": "{filter_by}",
		"redact_fields": ["{field_1}", "{field_2}"],
		"partial": 1,
	},
	{
		"doctype": "{doctype_2}",
		"filter_by": "{filter_by}",
		"partial": 1,
	},
	{
		"doctype": "{doctype_3}",
		"strict": False,
	},
	{
		"doctype": "{doctype_4}"
	}
]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"custom_expense_cliam.auth.validate"
# ]

