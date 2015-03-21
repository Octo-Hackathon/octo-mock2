class EqiResultsController < ApplicationController
  require 'csv'
  before_action :set_eqi_result, only: [:show, :edit, :update, :destroy]

  # GET /migrations
  # GET /migrations.json
  def migrate
    #Deleting all the data before the migration
    EqiResult.delete_all
    Rails.logger = Logger.new(STDOUT)
    #Reading the data from csv and converting into JSON objects
     CSV.foreach("./vendor/assets/data/Eqi_results_2013JULY22.csv", headers: true) do |row|
      eqiResult = EqiResult.new
      eqiResult.stateCode = row['state']
      eqiResult.countyCode =  row['stfips']
      eqiResult.countyDescription =  row['county_name']
      eqiResult.domain =  'Air'
      eqiResult.eqi =  row['air_EQI_22July2013']
      eqiResult.save
      eqiResult = EqiResult.new
      eqiResult.stateCode = row['state']
      eqiResult.countyCode =  row['stfips']
      eqiResult.countyDescription =  row['county_name']
      eqiResult.domain =  'Water'
      eqiResult.eqi =  row['water_EQI_22July2013']
      eqiResult.save
      eqiResult = EqiResult.new
      eqiResult.stateCode = row['state']
      eqiResult.countyCode =  row['stfips']
      eqiResult.countyDescription =  row['county_name']
      eqiResult.domain =  'Land'
      eqiResult.eqi =  row['land_EQI_22July2013']
      eqiResult.save
      eqiResult = EqiResult.new
      eqiResult.stateCode = row['state']
      eqiResult.countyCode =  row['stfips']
      eqiResult.countyDescription =  row['county_name']
      eqiResult.domain =  'Sociodemographic'
      eqiResult.eqi =  row['sociod_EQI_22July2013']
      eqiResult.save
      eqiResult = EqiResult.new
      eqiResult.stateCode = row['state']
      eqiResult.countyCode =  row['stfips']
      eqiResult.countyDescription =  row['county_name']
      eqiResult.domain =  'Built'
      eqiResult.eqi =  row['built_EQI_22July2013']
      eqiResult.save
      eqiResult = EqiResult.new
      eqiResult.stateCode = row['state']
      eqiResult.countyCode =  row['stfips']
      eqiResult.countyDescription =  row['county_name']
      eqiResult.domain =  'Overall'
      eqiResult.eqi =  row['EQI_22July2013']
      eqiResult.save     
     end
    result = Result.new("Successfully Executed")    
    render json: result
  end

  # GET /eqi_results
  # GET /eqi_results.json
  def index
    @eqi_results = EqiResult.all
  end

  # GET /eqi_results/1
  # GET /eqi_results/1.json
  def show
  end

  # GET /eqi_results/new
  def new
    @eqi_result = EqiResult.new
  end

  # GET /eqi_results/1/edit
  def edit
  end

  # POST /eqi_results
  # POST /eqi_results.json
  def create
    @eqi_result = EqiResult.new(eqi_result_params)

    respond_to do |format|
      if @eqi_result.save
        format.html { redirect_to @eqi_result, notice: 'Eqi result was successfully created.' }
        format.json { render :show, status: :created, location: @eqi_result }
      else
        format.html { render :new }
        format.json { render json: @eqi_result.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /eqi_results/1
  # PATCH/PUT /eqi_results/1.json
  def update
    respond_to do |format|
      if @eqi_result.update(eqi_result_params)
        format.html { redirect_to @eqi_result, notice: 'Eqi result was successfully updated.' }
        format.json { render :show, status: :ok, location: @eqi_result }
      else
        format.html { render :edit }
        format.json { render json: @eqi_result.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /eqi_results/1
  # DELETE /eqi_results/1.json
  def destroy
    @eqi_result.destroy
    respond_to do |format|
      format.html { redirect_to eqi_results_url, notice: 'Eqi result was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_eqi_result
      @eqi_result = EqiResult.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def eqi_result_params
      params.require(:eqi_result).permit(:stateCode, :stateDescription, :countyCode, :countyDescription, :domain, :eqi)
    end
end

class Result
   def initialize(message)
      @message=message
   end
end