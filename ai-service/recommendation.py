import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

def calculate_similar_tracks(target_track, track_catalog, top_n=3):
    """
    Compares a target track's audio features against a catalog of tracks 
    and returns the most similar matches.
    """
    # 1. Convert our JSON/Dict data into Pandas DataFrames
    target_df = pd.DataFrame([target_track])
    catalog_df = pd.DataFrame(track_catalog)
    
    # 2. Define the mathematical features we want to compare
    features = ['tempo', 'energy', 'danceability', 'valence']
    
    # 3. Compute Cosine Similarity between the target and the catalog
    # This outputs an array of similarity scores (0.0 to 1.0)
    similarity_scores = cosine_similarity(
        target_df[features], 
        catalog_df[features]
    )
    
    # 4. Attach the scores back to our catalog
    catalog_df['match_score'] = similarity_scores[0]
    
    # 5. Sort by the highest score, filter out the target track itself if it's in the catalog, and grab the top N
    catalog_df = catalog_df[catalog_df['track_id'] != target_track['track_id']]
    recommendations = catalog_df.sort_values(by='match_score', ascending=False).head(top_n)
    
    # Convert back to a standard Python dictionary to send over the API
    return recommendations.to_dict(orient='records')