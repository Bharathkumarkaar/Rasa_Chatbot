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
from actions.api import prlist,pritems

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
        message = f"The list of PR's are: {prlists}"
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

