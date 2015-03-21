json.array!(@eqi_details) do |eqi_detail|
  json.extract! eqi_detail, :id, :stateCode, :stateDescription, :countyCode, :countyDescription, :variableCode, :variableDescription, :variableValue, :domain
  json.url eqi_detail_url(eqi_detail, format: :json)
end
