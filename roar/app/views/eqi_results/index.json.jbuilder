json.array!(@eqi_results) do |eqi_result|
  json.extract! eqi_result, :id
  json.url eqi_result_url(eqi_result, format: :json)
end
