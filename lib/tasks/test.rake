namespace :test do
  task :javascripts do
    system 'bin/testjs'
  end
end

task 'test:all' => %w(test:javascripts test)
