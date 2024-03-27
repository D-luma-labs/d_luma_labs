import streamlit as st
import pickle
import re
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
from sklearn.feature_extraction.text import TfidfVectorizer
port_stem = PorterStemmer()
vectorization = TfidfVectorizer()

vector_form = pickle.load(open('vector.pkl', 'rb'))
load_model = pickle.load(open('model.pkl', 'rb'))

def stemming(content):
    con=re.sub('[^a-zA-Z]', ' ', content)
    con=con.lower()
    con=con.split()
    con=[port_stem.stem(word) for word in con if not word in stopwords.words('english')]
    con=' '.join(con)
    return con

def fake_news(news):
    news=stemming(news)
    input_data=[news]
    vector_form1=vector_form.transform(input_data)
    prediction = load_model.predict(vector_form1)
    return prediction



if __name__ == '__main__':
    st.title(' TruthChain ')

    # this section requires that the message or claim be input but that's gonna change when integrating it into our software cos we will have to send the output from the user's input from the frontend so....(weird comment but I hope it explains well)
    sentence = st.text_area("pass input", "",height=200)
    verify_btt = st.button("verify")
    if verify_btt:
        verification_class=fake_news(sentence)
        print(verification_class)
        if verification_class == [0]:
            st.success('Reliable')
        if verification_class == [1]:
            st.warning('Unreliable')
