# ===========================================================================
# Project:   Todos
# Copyright: ©2011 My Company, Inc.
# ===========================================================================

# Add initial buildfile information here
proxy '/_todos', :to => 'localhost:3000', :url => '/todos'
config :all, :required => "sproutcore"

