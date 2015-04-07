json.array!(@eqi_details) do |eqi_detail|
  json.extract! eqi_detail, :id
  json.url eqi_detail_url(eqi_detail, format: :json)
end
