import ApiConfig from '../../api.config'
import ApiService from './api-service';

class ContentService
{
    getContentListing() {
        return ApiService.request(ApiConfig.urls.CONTENT_LIST);
    }

    getContent(slug) {
        return ApiService.request(ApiConfig.urls.CONTENT_LOAD + slug);
    }

    getContentEdit(id) {
        return ApiService.request(ApiConfig.urls.ADMIN_CONTENT_LOAD + id);
    }

    saveContent(content) {
        
        let url = (content.id > 0)
            ? ApiConfig.urls.ADMIN_CONTENT_UPDATE + content.id
            : ApiConfig.urls.ADMIN_CONTENT_SAVE;

        return ApiService.request(url, 'post', content);
    }
}

export default new ContentService();
