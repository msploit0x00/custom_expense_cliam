# -*- coding: utf-8 -*-
from setuptools import setup, find_packages

with open('requirements.txt') as f:
	install_requires = f.read().strip().split('\n')

# get version from __version__ variable in custom_expense_cliam/__init__.py
from custom_expense_cliam import __version__ as version

setup(
	name='custom_expense_cliam',
	version=version,
	description='Expense Cliam multiCurrency',
	author='Peter Maged',
	author_email='eng.peter.maged@gmail.com',
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
