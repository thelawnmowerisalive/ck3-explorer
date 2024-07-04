class TemporaryOpinion {
    modifier = '';
    start_date = '';
    expiration_date = '';
    value = 0;
    revoke_title_reason;
}

class Opinion {
    owner = -1;
    target = -1;
    temporary_opinion = new TemporaryOpinion();
}

export { Opinion };