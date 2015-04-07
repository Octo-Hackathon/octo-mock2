require 'httparty'
class ZipController < ApplicationController
# GET /zip/1
  # GET /zip/1.json
  def show
    Rails.logger = Logger.new(STDOUT)
    logger.info "Id is :" << params[:id]  
    response = HTTParty.get('http://zips.dryan.io/'<<params[:id]<<'.json')   
    render json: response.body
  end
end