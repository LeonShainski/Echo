# This is V0.1 of our Fact Checking script

This script takes a file full of summarized news articles (one article per line), fact checks each of them, and returns a list of their fact check scores (in choronological order)

The plan is to optimize this script to take in that list of articles from a universal JSON file (which all parts of our backend will be re-worked to use), and simply add onto that file the fact check score (as the file will contain the link to the article, its summarized text, and now the fact checking score)

This fact checker is also still yet to be stress tested, so functionality may change (or we may use a different fact checker altogether)

This has now been implemented into the unified backend component.

Stay tuned for more updates!