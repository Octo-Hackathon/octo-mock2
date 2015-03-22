class EqiDetailsController < ApplicationController
  require 'csv'
  before_action :set_eqi_detail, only: [:show, :edit, :update, :destroy]

  # GET /migrations
  # GET /migrations.json
  def migrate
    #Deleting all the data before the migration
    EqiDetail.delete_all
    Rails.logger = Logger.new(STDOUT)
    #Reading the data from csv and converting into JSON objects
     ::CSV.foreach("./vendor/assets/data/Eqidata_all_domains_2014March11.csv", headers: true) do |row|

      eqiDetail = EqiDetail.new
      eqiDetail.stateCode = row['state']
      eqiDetail.countyCode =  row['stfips']
      eqiDetail.countyDescription =  row['county_name']
      eqiDetail.variableCode =  'a_no2_mean_ln'
      eqiDetail.variableDescription =  'Nitrogen dioxide (NO2)'
      eqiDetail.variableValue =  row['a_no2_mean_ln']
      eqiDetail.domain =  'Air'
      eqiDetail.save  

      eqiDetail = EqiDetail.new
      eqiDetail.stateCode = row['state']
      eqiDetail.countyCode =  row['stfips']
      eqiDetail.countyDescription =  row['county_name']
      eqiDetail.variableCode =  'a_so2_mean_ln'
      eqiDetail.variableDescription =  'Sulfur dioxide (SO2)'
      eqiDetail.variableValue =  row['a_so2_mean_ln']
      eqiDetail.domain =  'Air'
      eqiDetail.save 

      eqiDetail = EqiDetail.new
      eqiDetail.stateCode = row['state']
      eqiDetail.countyCode =  row['stfips']
      eqiDetail.countyDescription =  row['county_name']
      eqiDetail.variableCode =  'a_co_mean_ln'
      eqiDetail.variableDescription =  'Carbon monoxide (CO)'
      eqiDetail.variableValue =  row['a_co_mean_ln']
      eqiDetail.domain =  'Air'
      eqiDetail.save   

      eqiDetail = EqiDetail.new
      eqiDetail.stateCode = row['state']
      eqiDetail.countyCode =  row['stfips']
      eqiDetail.countyDescription =  row['county_name']
      eqiDetail.variableCode =  'avgofd3_ave'
      eqiDetail.variableDescription =  '% of county drought – extreme (D3-D4)'
      eqiDetail.variableValue =  row['avgofd3_ave']
      eqiDetail.domain =  'Water'
      eqiDetail.save  

      eqiDetail = EqiDetail.new
      eqiDetail.stateCode = row['state']
      eqiDetail.countyCode =  row['stfips']
      eqiDetail.countyDescription =  row['county_name']
      eqiDetail.variableCode =  'w_hg_ln'
      eqiDetail.variableDescription =  'Mercury (inorganic)'
      eqiDetail.variableValue =  row['w_hg_ln']
      eqiDetail.domain =  'Water'
      eqiDetail.save 

      eqiDetail = EqiDetail.new
      eqiDetail.stateCode = row['state']
      eqiDetail.countyCode =  row['stfips']
      eqiDetail.countyDescription =  row['county_name']
      eqiDetail.variableCode =  'w_as_ln'
      eqiDetail.variableDescription =  'Arsenic'
      eqiDetail.variableValue =  row['w_as_ln']
      eqiDetail.domain =  'Water'
      eqiDetail.save 

      eqiDetail = EqiDetail.new
      eqiDetail.stateCode = row['state']
      eqiDetail.countyCode =  row['stfips']
      eqiDetail.countyDescription =  row['county_name']
      eqiDetail.variableCode =  'med_hh_inc'
      eqiDetail.variableDescription =  'Median household income'
      eqiDetail.variableValue =  row['med_hh_inc']
      eqiDetail.domain =  'Sociodemographic'
      eqiDetail.save 

      eqiDetail = EqiDetail.new
      eqiDetail.stateCode = row['state']
      eqiDetail.countyCode =  row['stfips']
      eqiDetail.countyDescription =  row['county_name']
      eqiDetail.variableCode =  'pct_unemp'
      eqiDetail.variableDescription =  'Percent unemployed'
      eqiDetail.variableValue =  row['pct_unemp']
      eqiDetail.domain =  'Sociodemographic'
      eqiDetail.save 

      eqiDetail = EqiDetail.new
      eqiDetail.stateCode = row['state']
      eqiDetail.countyCode =  row['stfips']
      eqiDetail.countyDescription =  row['county_name']
      eqiDetail.variableCode =  'violent_rate_log'
      eqiDetail.variableDescription =  'Mean number of violent crimes per capita'
      eqiDetail.variableValue =  row['violent_rate_log']
      eqiDetail.domain =  'Sociodemographic'
      eqiDetail.save 

      eqiDetail = EqiDetail.new
      eqiDetail.stateCode = row['state']
      eqiDetail.countyCode =  row['stfips']
      eqiDetail.countyDescription =  row['county_name']
      eqiDetail.variableCode =  'hwyprop'
      eqiDetail.variableDescription =  'Proportion of roads that are highway'
      eqiDetail.variableValue =  row['hwyprop']
      eqiDetail.domain =  'Built'
      eqiDetail.save 

      eqiDetail = EqiDetail.new
      eqiDetail.stateCode = row['state']
      eqiDetail.countyCode =  row['stfips']
      eqiDetail.countyDescription =  row['county_name']
      eqiDetail.variableCode =  'ryprop'
      eqiDetail.variableDescription =  'Proportion of roads that are primary streets'
      eqiDetail.variableValue =  row['ryprop']
      eqiDetail.domain =  'Built'
      eqiDetail.save 

      eqiDetail = EqiDetail.new
      eqiDetail.stateCode = row['state']
      eqiDetail.countyCode =  row['stfips']
      eqiDetail.countyDescription =  row['county_name']
      eqiDetail.variableCode =  'fatal_rate_log'
      eqiDetail.variableDescription =  'Traffic fatality rate'
      eqiDetail.variableValue =  row['fatal_rate_log']
      eqiDetail.domain =  'Built'
      eqiDetail.save 

     end
    result = Result.new("Successfully Executed")    
    render json: result
  end

  # GET /eqi_details
  # GET /eqi_details.json
  def index
    @eqi_details = EqiDetail.all
  end

  # GET /eqi_details/1
  # GET /eqi_details/1.json
  def show
  end

  # GET /eqi_details/new
  def new
    @eqi_detail = EqiDetail.new
  end

  # GET /eqi_details/1/edit
  def edit
  end

  # POST /eqi_details
  # POST /eqi_details.json
  def create
    @eqi_detail = EqiDetail.new(eqi_detail_params)

    respond_to do |format|
      if @eqi_detail.save
        format.html { redirect_to @eqi_detail, notice: 'Eqi detail was successfully created.' }
        format.json { render :show, status: :created, location: @eqi_detail }
      else
        format.html { render :new }
        format.json { render json: @eqi_detail.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /eqi_details/1
  # PATCH/PUT /eqi_details/1.json
  def update
    respond_to do |format|
      if @eqi_detail.update(eqi_detail_params)
        format.html { redirect_to @eqi_detail, notice: 'Eqi detail was successfully updated.' }
        format.json { render :show, status: :ok, location: @eqi_detail }
      else
        format.html { render :edit }
        format.json { render json: @eqi_detail.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /eqi_details/1
  # DELETE /eqi_details/1.json
  def destroy
    @eqi_detail.destroy
    respond_to do |format|
      format.html { redirect_to eqi_details_url, notice: 'Eqi detail was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_eqi_detail
      @eqi_detail = EqiDetail.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def eqi_detail_params
      params.require(:eqi_detail).permit(:stateCode, :stateDescription, :countyCode, :countyDescription, :variableCode, :variableDescription, :variableValue, :domain)
    end
end

class Result
   def initialize(message)
      @message=message
   end
end