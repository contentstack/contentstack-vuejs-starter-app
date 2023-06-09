import {getEntries, getEntryByUrl} from "../plugins/contentstack"
import { HeaderRes,FooterRes } from '../typescript/response';
import { Page, BlogPost } from '../typescript/pages';


export const getHeader = async (): Promise<HeaderRes> => {
    const response = await getEntries({
        contentTypeUid: 'header',
        referenceFieldPath: ['navigation_menu.page_reference'],
        jsonRtePath: ['notification_bar.announcement_text'],
    }) as HeaderRes[]
    return response[0];
};

export const getFooter = async (): Promise<FooterRes> => {
    const response= await getEntries({
        contentTypeUid: 'footer',
        referenceFieldPath: undefined,
        jsonRtePath: ['copyright'],
    }) as FooterRes[];
    return response[0];
};

export const getAllEntries = async (): Promise<Page[]> => {
    const response = await getEntries({
        contentTypeUid: 'page',
        referenceFieldPath: undefined,
        jsonRtePath: undefined
    }) as Page[];
    return response;
};

export const getPage = async (entryUrl: string): Promise<Page> => {
    const response = await getEntryByUrl({
        contentTypeUid: 'page',
        entryUrl,
        referenceFieldPath: ['page_components.from_blog.featured_blogs'],
        jsonRtePath: [
            'page_components.from_blog.featured_blogs.body',
            'page_components.section_with_buckets.buckets.description',
            'page_components.section_with_html_code.description',
        ],
    }) as Page[];
    return response[0];
};

export const getBlogList = async (): Promise<BlogPost[]> => {
    const response = await getEntries({
        contentTypeUid: 'blog_post',
        referenceFieldPath: ['author', 'related_post'],
        jsonRtePath: ['body'],
    }) as BlogPost[];
    return response;
};

export const getBlogPost = async (entryUrl: string): Promise<BlogPost> => {
    const response = await getEntryByUrl({
        contentTypeUid: 'blog_post',
        entryUrl,
        referenceFieldPath: ['author', 'related_post'],
        jsonRtePath: ['body', 'related_post.body'],
    }) as BlogPost[];
    return response[0] as BlogPost;
};
