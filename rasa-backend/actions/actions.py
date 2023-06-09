# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

# from typing import Any, Text, Dict, List
#
# from rasa_sdk import Action, Tracker
# from rasa_sdk.executor import CollectingDispatcher
#
#
# class ActionHelloWorld(Action):
#
#     def name(self) -> Text:
#         return "action_hello_world"
#
#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#
#         dispatcher.utter_message(text="Hello World!")
#
#         return []

import datetime as dt
import json
from typing import Any, Text, Dict, List

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet
from actions.api import prlist, pritems, pritemdetails

prno = ''
pritemno = ''

def clear_global_variable(): 
    global prno 
    prno = None 
    global pritemno
    pritemno = None
    

class ActionHelloWorld(Action):

    def name(self) -> Text:
        return "action_show_time"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        dispatcher.utter_message(text=f"{dt.datetime.now()}")

        return []

class ActionCompanyPolicy(Action):

    def name(self) -> Text:
        return "action_company_policy"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        policies = [
            {"link": "https://kaartechit-my.sharepoint.com/:b:/g/personal/damudhesh_kaartech_com/EakotOTzBSJJk14tvlv0qysBGRVUWtgbAphYAyGCMhEwlw",
            "tag": "Corporate attire policy"},
            {"link": "https://kaartechit-my.sharepoint.com/:b:/g/personal/damudhesh_kaartech_com/EXenNdcSxplEs0795wun3xwB9vIVq6AOfYxYA7lu7LkYkQ",
            "tag": "Over-time policy"},
            {"link": "https://kaartechit-my.sharepoint.com/:b:/g/personal/damudhesh_kaartech_com/EW6IxmSseApHprv0YfmaBFIBjtjXSZGd1d_0Hj-LiAj5jA?e=DDrHdl",
            "tag": "Probation policy"},
            {"link": "https://kaartechit-my.sharepoint.com/:b:/g/personal/damudhesh_kaartech_com/EQs4RqFLVplFlyL05_B0wZwBWzOt64LG5G-VtpREz_pJTw",
            "tag": "Leave policy"},
            {"link": "https://kaartechit-my.sharepoint.com/:b:/g/personal/damudhesh_kaartech_com/ERhC79Ge2jJLqPMUcwdR1qsBCs2ujgBfpY5ticfA-FCtug",
            "tag": "Travel policy"},
        ]

        send = {"links":policies,"msg":"The Company Policies are.."}
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)

        return []

class ActionPRList(Action):

    def name(self) -> Text:
        return "action_pr_list"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        prlists = prlist()
        prlists = prlists[:50]
        # dispatcher.utter_template("utter_givepr",tracker,temp=prlists)
        # message = f"The list of PR's are: {prlists}. Choose a PR Number to display its items"
        send = {"pr":prlists,"msg":"The PR lists are given below. Choose Any one to see PR Items"}
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)
        # dispatcher.utter_message(text=prlists)
        # dispatcher.utter_message(text=f"Your pr number is {pr_num}!")

        return []
    
# class ActionPRNumber(Action):

#     def name(self) -> Text:
#         return "action_pr_number"

#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#         prlists = prlist()
#         prlists = prlists[:10]
#         # dispatcher.utter_template("utter_givepr",tracker,temp=prlists)
#         message = f"The list of PR's are: {prlists}. Choose a PR Number to display its items"
#         dispatcher.utter_message(text=message)
#         # dispatcher.utter_message(text=f"Your pr number is {pr_num}!")

#         return []


class ActionPRitems(Action):

    def name(self) -> Text:
        return "action_pr_items"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        global prno
        prno=tracker.get_slot("prnumber")
        # prno = prnotext
        # prno = tracker.get_slot("prnumber")
        pritemslist = pritems(prno)
        pritemslist = pritemslist[:50]
        # dispatcher.utter_template("utter_givepr",tracker,temp=prlists)
        # message = f"The list of PR's items are: {pritemslist}. Choose Any one to see the description.."
        # dispatcher.utter_message(text=message)

        send = {"pr":pritemslist,"msg":"The PR items lists are given below. Choose Any one to see the Item description"}
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)

        return [SlotSet('other_slot', prno)]


class ActionPRitemDesc(Action):

    def name(self) -> Text:
        return "action_pr_item_desc"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        # prno=tracker.latest_message['text']
        # prno = '10000640'
        # pritemno = '220'
        # prno = tracker.get_slot('other_slot')
        global pritemno,prno
        pritemnotext = tracker.latest_message['text']
        pritemno = pritemnotext.split()[-1]
        print(prno)
        print(pritemno)
        pritemdesc = pritemdetails(prno, pritemno)
        print(pritemdesc)
        for i in pritemdesc.keys():
            if i == 'Purchase_Requisition_Number':
                PRnumber = pritemdesc[i]
            elif i == 'Purchase_Requisition_Item_Number':
                PRItemNumber = pritemdesc[i]
            elif i == 'Purchase_Requisition_Release_Status':
                PRItemStatus = pritemdesc[i]
            elif i == 'Purchase_Requisition_Item_Text':
                PRItemText = pritemdesc[i]
            elif i == 'Purchase_Requisition_Material_Group':
                PRMaterialGroup = pritemdesc[i]
            elif i == 'Requested_Quantity':
                PRQuantity = pritemdesc[i]
            elif i == 'Base_Unit':
                PRBaseUnit = pritemdesc[i]
            elif i == 'Purchase_Requisition_Price':
                PRPrice = pritemdesc[i]
            elif i == 'Plant':
                PRPlant = pritemdesc[i]
            elif i == 'Company_Code':
                PRCompanyCode = pritemdesc[i]
            elif i=='Processing_Status':
                PRProcessingStatus = pritemdesc[i]
            elif i == 'Delivery_Date':
                PRDeliveryDate = pritemdesc[i]
            elif i == 'Creation_Date':
                PRCreationDate = pritemdesc[i]

        if(PRItemStatus=='01'):
            status = 'Saved, not yet released'
        elif(PRItemStatus=='02'):
            status = 'Released'
        elif(PRItemStatus=='03'):
            status = 'Partially ordered'
        elif(PRItemStatus=='04'):
            status = 'Completely ordered'
        elif(PRItemStatus=='05'):
            status = 'Deleted'
        elif(PRItemStatus=='06'):
            status = 'Manually set to Closed'
        elif(PRItemStatus=='07'):
            status = 'Technically completed'
        elif(PRItemStatus=='08'):
            status = 'Manually set to Locked'
        elif(PRItemStatus=='09'):
            status = 'Sent'
        elif(PRItemStatus=='10'):
            status = 'Partially invoiced'
        elif(PRItemStatus=='11'):
            status = 'Completely invoiced'
        elif(PRItemStatus=='12'):
            status = 'Manually set to Archived'

        if(PRProcessingStatus=='N'):
            Pstatus = 'Not edited'
        elif(PRProcessingStatus=='B'):
            Pstatus = 'PO created'
        elif(PRProcessingStatus=='A'):
            Pstatus = 'RFQ created'
        elif(PRProcessingStatus=='K'):
            Pstatus = 'Contract created'
        elif(PRProcessingStatus=='L'):
            Pstatus = 'Scheduling aggrement created'
        elif(PRProcessingStatus=='S'):
            Pstatus = 'Service entry sheet created'
        elif(PRProcessingStatus=='D'):
            Pstatus = 'Deployment STR'
        elif(PRProcessingStatus=='E'):
            Pstatus = 'RFQ sent to external system for sourcing'

        new_line = '\n'
        details = {
        "Purchase Requisition Number" : PRnumber,
        "Purchase Requisition Item Number" : PRItemNumber,
        "Purchase_Requisition_Release_Status" : f"{ PRItemStatus} - {status}",
        "Purchase Requisition Item Text" : PRItemText,
        "Purchase_Requisition_Material_Group" : PRMaterialGroup,
        "Requested_Quantity" : PRQuantity,
        "Base_Unit" : PRBaseUnit,
        "Purchase_Requisition_Price" : PRPrice,
        "Plant" : PRPlant,
        "Company_Code" : PRCompanyCode,
        "Processing_Status" : f"{PRProcessingStatus} - {Pstatus}",
        "Creation_Date" : PRCreationDate,
        "Delivery_Date" : PRDeliveryDate,
        }
        # dispatcher.utter_message(text=message)
        send = {"msg":"Here is the Details of Purchase Requisition... ","details":details}
        my_json = json.dumps(send)
        dispatcher.utter_message(text=my_json)


        clear_global_variable()
        return []
