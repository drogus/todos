# ===========================================================================
# Project:   Todos
# Copyright: ©2011 My Company, Inc.
# ===========================================================================

# Add initial buildfile information here
proxy '/api/bulk', :to => 'localhost:3000', :url => '/api/bulk'
config :all, :required => ["sproutcore/foundation", "sproutcore/datastore", :bulk_data_source], :theme => "sproutcore/empty_theme"
