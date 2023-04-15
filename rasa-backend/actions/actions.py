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
from typing import Any, Text, Dict, List

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from actions.api import prlist,pritems,pritemdetails

class ActionHelloWorld(Action):

    def name(self) -> Text:
        return "action_show_time"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        dispatcher.utter_message(text=f"{dt.datetime.now()}")

        return []
    
class ActionPRList(Action):

    def name(self) -> Text:
        return "action_pr_list"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        prlists = prlist()
        prlists = prlists[:10]
        # dispatcher.utter_template("utter_givepr",tracker,temp=prlists)
        message = f"The list of PR's are: {prlists}. Choose a PR Number to display its items"
        dispatcher.utter_message(text=message)

        return []

class ActionPRitems(Action):

    def name(self) -> Text:
        return "action_pr_items"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        # prno=tracker.latest_message['text']
        prno='10000640'
        pritemslist = pritems(prno)
        pritemslist = pritemslist[:10]
        # dispatcher.utter_template("utter_givepr",tracker,temp=prlists)
        message = f"The list of PR's items are: {pritemslist}"
        dispatcher.utter_message(text=message)

        return []
    
class ActionPRitemDesc(Action):

    def name(self) -> Text:
        return "action_pr_item_desc"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        # prno=tracker.latest_message['text']
        prno='10000640'
        pritemno='220'
        pritemdesc = pritemdetails(prno,pritemno)
        for i in pritemdesc.keys():
            if i=='Requisitioner_Name':
                Name = pritemdesc[i]
            elif i=='Purchase_Requisition_Number':
                PRnumber = pritemdesc[i]
            elif i=='Purchase_Requisition_Item_Number':
                PRItemNumber = pritemdesc[i]
            elif i=='Purchase_Requisition_Material':
                Material = pritemdesc[i]
            elif i=='Purchase_Requisition_Item_Text':
                PRItemText = pritemdesc[i]
            elif i=='Purchase_Requisition_Release_Date':
                PRReleaseDate = pritemdesc[i]
        # dispatcher.utter_template("utter_givepr",tracker,temp=prlists)
        new_line='\n'
        message = f"""Here are the Details of Purchase Requisition... {new_line} 
        Requisitioner Name : {Name} {new_line}
        Purchase Requisition Number : {PRnumber} {new_line}
        Purchase Requisition Item Number : {PRItemNumber} {new_line}
        Purchase Requisition Material : {Material} {new_line}
        Purchase Requisition Item Text : {PRItemText} {new_line}
        Purchase_Requisition_Release_Date : {PRReleaseDate}"""
        dispatcher.utter_message(text=message)

        return []

