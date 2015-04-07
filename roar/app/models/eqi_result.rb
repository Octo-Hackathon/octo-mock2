
class EqiResult

  include Mongoid::Document
  store_in collection: "eqiresults", database: "octo-mock2"
  field :stateCode, type: String
  field :stateDescription, type: String
  field :countyCode, type: String
  field :countyDescription, type: String
  field :domain, type: String
  field :eqi, type: Float



end

