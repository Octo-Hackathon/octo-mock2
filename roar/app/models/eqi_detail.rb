class EqiDetail
  include Mongoid::Document
  store_in collection: "eqidetails", database: "octo-mock2"
  field :stateCode, type: String
  field :stateDescription, type: String
  field :countyCode, type: String
  field :countyDescription, type: String
  field :variableCode, type: String
  field :variableDescription, type: String
  field :variableValue, type: Float
  field :domain, type: String
end
