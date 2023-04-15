import requests
import xmltodict, json
from flatten_json import flatten

url = 'http://172.26.0.121:8002/sap/opu/odata/sap/API_PURCHASEREQ_PROCESS_SRV/A_PurchaseRequisitionHeader'
username = 'K1277'
password = 'Kaar@1234'
# Create a session and set the authorization header
session = requests.Session()
session.auth = (username, password)

def prlist():
    api_address='http://172.26.0.121:8002/sap/opu/odata/sap/API_PURCHASEREQ_PROCESS_SRV/A_PurchaseRequisitionHeader'
    # city = input('Enter the City Name :')
    url = api_address
    xml_data = session.get(url)
    obj = xml_data.content
    objstr = str(obj, 'UTF-8')
    obj2 = xmltodict.parse(objstr)
    js = json.dumps(obj2)
    js_obj = json.loads(js)
    values = js_obj['feed']['entry']
    prnumber=[]
    for i in values:
        prnumber.append(i['content']['m:properties']['d:PurchaseRequisition'])
    return prnumber

def pritems(prno):
    api_address=f'http://172.26.0.121:8002/sap/opu/odata/sap/API_PURCHASEREQ_PROCESS_SRV/A_PurchaseRequisitionHeader(\'{prno}\')?$expand=to_PurchaseReqnItem'
    url = api_address
    response = session.get(url)
# Print the response status code and content
    obj = response.content
    objstr = str(obj, 'UTF-8')
    obj2 = xmltodict.parse(objstr)
    js = json.dumps(obj2)
    js_obj = json.loads(js)
    flatjs = flatten(js_obj)
    itemlist=[]
    i=0
    while True:
        try:
            itemlist.append(flatjs[f'entry_link_1_m:inline_feed_entry_{i}_content_m:properties_d:PurchaseRequisitionItem'])
            i+=1
        except:
            break
    return itemlist



# def prupdate(prno):
#     api_address='http://api.openweathermap.org/data/2.5/weather?appid=0c42f7f6b53b244c78a418f4f181282a&q='
#     # city = input('Enter the City Name :')
#     url = api_address + prno
#     json_data = requests.get(url).json()
#     format_add = json_data['main']
#     print(format_add)
#     # print("Weather is {0} Temperature is mininum {1} Celcius and maximum is {2} Celcius".format(
#     #     json_data['weather'][0]['main'],int(format_add['temp_min']-273),int(format_add['temp_max']-272)))
#     return format_add

# def prdelete(prno):
#     api_address='http://api.openweathermap.org/data/2.5/weather?appid=0c42f7f6b53b244c78a418f4f181282a&q='
#     # city = input('Enter the City Name :')
#     url = api_address + prno
#     json_data = requests.get(url).json()
#     format_add = json_data['main']
#     print(format_add)
#     # print("Weather is {0} Temperature is mininum {1} Celcius and maximum is {2} Celcius".format(
#     #     json_data['weather'][0]['main'],int(format_add['temp_min']-273),int(format_add['temp_max']-272)))
#     return format_add