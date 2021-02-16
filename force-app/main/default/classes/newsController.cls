public inherited sharing class newsController {
    @AuraEnabled
    public static Map<string,Object> retriveNews(){
        HttpRequest httpRequest = new HttpRequest();
        httpRequest.setEndpoint('http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=a3dfc365988a470f8fc3b9e7f5f0acac');
        httpRequest.setMethod('GET');
        Map<string,Object> newsJsonData = new Map<String,Object>();
        String strResponse = null;
        try{
            Http http = new Http();
            HttpResponse httpResponse = http.send(httpRequest);
            if(httpResponse.getStatusCode() == 200){
                strResponse = httpResponse.getBody();
            }
            else {
                throw new  CalloutException(httpResponse.getBody());
            }
        }
        catch(Exception ex){
            throw ex;
        }
        
        if(!String.isBlank(strResponse)){
            newsJsonData = (Map<String,Object>)JSON.deserializeUntyped(strResponse);
           
        }
        if(!newsJsonData.isEmpty()){
            return newsJsonData;
        }
        else {
            return null;
        }
    }
}
