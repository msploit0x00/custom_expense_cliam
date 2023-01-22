// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

frappe.provide("erpnext.hr");
frappe.provide("erpnext.accounts.dimensions");

frappe.ui.form.on('Expense Claim', {
	currency: function(frm){
		if (frm.doc.currency){
			frm.call({
				method: "get_exchange_rate",
				doc: frm.doc,
			}).then((r) => {
				
					
				//frm.events.get_advances(frm)
				if(frm.doc.expenses){
					frm.doc.expenses.forEach((e)=>{
						frm.events.get_account_details(frm,e.doctype,e.name)
					})

				}
				frm.refresh_field('expenses')
					frm.refresh_field('currency')
					frm.refresh_field('conversion_rate')
					frm.refresh_field('advances')
				
			});
		}
	},
	get_account_details:function(frm,cdt,cdn)
	{
		if (!frm.doc.currency){
			frappe.throw("Please Set Currency")
		}
		let d = locals [cdt] [cdn] 
		if (!(d.expense_type && frm.doc.company && frm.doc.currency)){
			return
		}

		return frappe.call({
			method: "custom_expense_cliam.custom_expense_cliam.doctype.expense_claim.expense_claim.get_account_details",
			args: {
				"expense_claim_type": d.expense_type,
				"currency": frm.doc.currency,
				"company": frm.doc.company
			},
			callback: function(r) {
				if (r.message) {
					d.conversion_rate = r.message.conversion_rate;
					d.account_currency = r.message.account_currency;
					d.currency = frm.doc.currency;
					frm.refresh_field('expenses')

				}
			}
		});
	}
});

frappe.ui.form.on('Expense Claim Detail', {
	expense_type: function(frm, cdt, cdn) {
		var d = locals[cdt][cdn];
		if (!frm.doc.company) {
			d.expense_type = "";
			frappe.msgprint(__("Please set the Company"));
			this.frm.refresh_fields();
			return;
		}

		if(!d.expense_type) {
			return;
		}

		
		frm.events.get_account_details(frm,cdt,cdn)
		/*
		return frappe.call({
			method: "erpnext.hr.doctype.expense_claim.expense_claim.get_expense_claim_account_and_cost_center",
			args: {
				"expense_claim_type": d.expense_type,
				"company": frm.doc.company
			},
			callback: function(r) {
				if (r.message) {
					d.default_account = r.message.account;
					d.cost_center = r.message.cost_center;
				}
			}
		});*/
	}
});



erpnext.expense_claim = {
	set_title: function(frm) {
		if (!frm.doc.task) {
			frm.set_value("title", frm.doc.employee_name);
		}
		else {
			frm.set_value("title", frm.doc.employee_name + " for "+ frm.doc.task);
		}
	}
};

frappe.ui.form.on("Expense Claim", {
	setup: function(frm) {
	//	frm.add_fetch("company", "cost_center", "cost_center");
	//	frm.add_fetch("company", "default_expense_claim_payable_account", "payable_account");

		frm.set_query("employee_advance", "advances", function() {
			return {
				filters: [
					['docstatus', '=', 1],
					['employee', '=', frm.doc.employee],
					['paid_amount', '>', 0],
					['paid_amount', '>', 'claimed_amount'],
					['currency' , '=' , frm.doc.currency]
				]
			};
		});

		

		frm.set_query("payable_account", function() {
			return {
				filters: {
					"report_type": "Balance Sheet",
					"account_type": "Payable",
					"company": frm.doc.company,
					"is_group": 0,
					//'account_currency' : frm.doc.currency
				}
			};
		});
	},

	onload: function(frm) {
		
	},

	refresh: function(frm) {
	},

	calculate_grand_total: function(frm) {
		var grand_total = flt(frm.doc.total_sanctioned_amount) + flt(frm.doc.total_taxes_and_charges) - flt(frm.doc.total_advance_amount);
		frm.set_value("grand_total", grand_total);
		frm.refresh_fields();
	},

	grand_total: function(frm) {
		//frm.trigger("update_employee_advance_claimed_amount");
	},

	update_employee_advance_claimed_amount: function(frm) {
		
	},

	make_payment_entry: function(frm) {
		/*
		var method = "erpnext.accounts.doctype.payment_entry.payment_entry.get_payment_entry";
		if(frm.doc.__onload && frm.doc.__onload.make_payment_via_journal_entry) {
			method = "erpnext.hr.doctype.expense_claim.expense_claim.make_bank_entry";
		}
		return frappe.call({
			method: method,
			args: {
				"dt": frm.doc.doctype,
				"dn": frm.doc.name
			},
			callback: function(r) {
				var doclist = frappe.model.sync(r.message);
				frappe.set_route("Form", doclist[0].doctype, doclist[0].name);
			}
		});*/
	},

	is_paid: function(frm) {
		//frm.trigger("toggle_fields");
	},

	toggle_fields: function(frm) {
		//frm.toggle_reqd("mode_of_payment", frm.doc.is_paid);
	},

	employee_name: function(frm) {
		//erpnext.expense_claim.set_title(frm);
	},

	task: function(frm) {
		//erpnext.expense_claim.set_title(frm);
	},

	employee: function(frm) {
		//frm.events.get_advances(frm);
	},

	cost_center: function(frm) {
		//frm.events.set_child_cost_center(frm);
	},

	validate: function(frm) {
	},

	set_child_cost_center: function(frm){
	/*	(frm.doc.expenses || []).forEach(function(d) {
			if (!d.cost_center){
				d.cost_center = frm.doc.cost_center;
			}
		});*/
	},get_advances: function(frm) {
		frappe.model.clear_table(frm.doc, "advances");
		if (frm.doc.employee && frm.doc.currency) {
			return frappe.call({
				method: "erpnext.hr.doctype.expense_claim.expense_claim.get_advances",
				args: {
					employee: frm.doc.employee,
					currency:frm.doc.currency
				},
				callback: function(r, rt) {

					if(r.message) {
						$.each(r.message, function(i, d) {
							var row = frappe.model.add_child(frm.doc, "Expense Claim Advance", "advances");
							row.employee_advance = d.name;
							row.posting_date = d.posting_date;
							row.advance_account = d.advance_account;
							row.advance_paid = d.paid_amount;
							row.unclaimed_amount = flt(d.paid_amount) - flt(d.claimed_amount);
							row.allocated_amount = 0;
							row.currency=d.currency
						});
						refresh_field("advances");
					}
				}
			});
		}
	}

});

frappe.ui.form.on("Expense Claim Detail", {
	expenses_add : function(frm,cdt,cdn){
		var d = locals [cdt] [cdn]
		d.currency = frm.doc.currency
		frm.refresh_field('expenses')

	},
	amount: function(frm, cdt, cdn) {
		
	},

	sanctioned_amount: function(frm, cdt, cdn) {
		
	},
	cost_center: function(frm, cdt, cdn) {

	}
});

frappe.ui.form.on("Expense Claim Advance", {
	advances_add: function(frm, cdt, cdn) {
		var d = locals [cdt] [cdn]
		d.currency = frm.doc.currency
		frm.refresh_field('advances')
	},
	employee_advance: function(frm, cdt, cdn) {
	
		
	}
});

frappe.ui.form.on("Expense Taxes and Charges", {
	account_head: function(frm, cdt, cdn) {
	
	},

	calculate_total_tax: function(frm, cdt, cdn) {
	
	},

	calculate_tax_amount: function(frm) {
		
	},

	rate: function(frm, cdt, cdn) {
	
	},

	tax_amount: function(frm, cdt, cdn) {
	}
});