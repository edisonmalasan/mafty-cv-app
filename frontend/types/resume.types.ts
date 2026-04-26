// ENUMS
export type SectionType =
  | "EXPERIENCE"
  | "EDUCATION"
  | "PROJECTS"
  | "SKILLS"
  | "CERTIFICATIONS"
  | "LANGUAGES"
  | "INTERESTS"
  | "REFERENCES"
  | "ORGANIZATIONS"
  | "PUBLICATIONS"
  | "AWARDS"
  | "COURSES"
  | "DECLARATION"
  | "CUSTOM"

export type SkillLevel =
  | "BEGINNER"
  | "AMATEUR"
  | "COMPETENT"
  | "PROFICIENT"
  | "EXPERT"

export type Proficiency =
  | "BASIC"
  | "CONVERSATIONAL"
  | "PROFICIENT"
  | "FLUENT"
  | "NATIVE"

export type WorkMode = "REMOTE" | "HYBRID" | "ON_SITE"

export type MaritalStatus =
  | "SINGLE"
  | "MARRIED"
  | "DIVORCED"
  | "WIDOWED"
  | "PREFER_NOT_TO_SAY"

export type PaperSize = "A4" | "LETTER"

export type ExportFormat = "PDF" | "DOCX"

// SOCIAL LINK
export interface SocialLink {
  id: string
  headerId: string
  platform: string
  url: string
  label: string | null
  position: number
}

// used when creating/updating (no id or headerId needed from client)
export type SocialLinkInput = Omit<SocialLink, "id" | "headerId">

// RESUME HEADER
export interface ResumeHeader {
  id: string
  resumeId: string

  // personal details
  namePrefix: string | null
  firstName: string | null
  lastName: string | null
  jobTitle: string | null
  avatarUrl: string | null
  email: string | null
  phone: string | null
  city: string | null
  country: string | null
  summary: string | null

  // additional personal details
  passportId: string | null
  nationality: string | null
  dateOfBirth: string | null
  visa: string | null
  availability: string | null
  gender: string | null
  pronoun: string | null
  disability: string | null
  workMode: WorkMode | null
  willingToRelocate: boolean | null
  expectedSalary: string | null
  secondPhone: string | null
  drivingLicense: string | null
  securityClearance: string | null
  maritalStatus: MaritalStatus | null
  militaryService: string | null
  smoking: boolean | null
  height: string | null
  weight: string | null

  socialLinks: SocialLink[]

  createdAt: string
  updatedAt: string
}

export type UpdateHeaderInput = Partial<
  Omit<
    ResumeHeader,
    "id" | "resumeId" | "socialLinks" | "createdAt" | "updatedAt"
  >
>

// RESUME SETTINGS
export interface ResumeSettings {
  id: string
  resumeId: string
  primaryColor: string | null
  fontFamily: string | null
  fontSize: number | null
  lineSpacing: number | null
  sectionSpacing: number | null
  paperSize: PaperSize
  createdAt: string
  updatedAt: string
}

export type UpdateSettingsInput = Partial<
  Pick<
    ResumeSettings,
    | "primaryColor"
    | "fontFamily"
    | "fontSize"
    | "lineSpacing"
    | "sectionSpacing"
    | "paperSize"
  >
>

// SECTION ITEMS
export interface ExperienceItem {
  id: string
  sectionId: string
  jobTitle: string | null
  company: string | null
  companyUrl: string | null
  startDate: string | null
  endDate: string | null
  current: boolean
  location: string | null
  description: string | null // rich text HTML
  position: number
  createdAt: string
  updatedAt: string
}

export interface EducationItem {
  id: string
  sectionId: string
  degree: string | null
  school: string | null
  schoolUrl: string | null
  startDate: string | null
  endDate: string | null
  location: string | null
  description: string | null
  position: number
  createdAt: string
  updatedAt: string
}

export interface ProjectItem {
  id: string
  sectionId: string
  name: string | null
  subtitle: string | null
  url: string | null
  startDate: string | null
  endDate: string | null
  current: boolean
  description: string | null
  position: number
  createdAt: string
  updatedAt: string
}

export interface SkillItem {
  id: string
  sectionId: string
  name: string | null
  information: string | null // sub-skills, rich text
  level: SkillLevel | null
  position: number
  createdAt: string
  updatedAt: string
}

export interface CertificationItem {
  id: string
  sectionId: string
  name: string | null
  url: string | null
  information: string | null
  position: number
  createdAt: string
  updatedAt: string
}

export interface LanguageItem {
  id: string
  sectionId: string
  language: string | null
  information: string | null // TOEFL score, IELTS band, etc.
  proficiency: Proficiency | null
  position: number
  createdAt: string
  updatedAt: string
}

export interface InterestItem {
  id: string
  sectionId: string
  interest: string | null
  url: string | null
  information: string | null
  position: number
  createdAt: string
  updatedAt: string
}

export interface ReferenceItem {
  id: string
  sectionId: string
  name: string | null
  nameUrl: string | null
  jobTitle: string | null
  organization: string | null
  email: string | null
  phone: string | null
  position: number
  createdAt: string
  updatedAt: string
}

export interface OrganizationItem {
  id: string
  sectionId: string
  organization: string | null
  organizationUrl: string | null
  role: string | null
  startDate: string | null
  endDate: string | null
  current: boolean
  location: string | null
  description: string | null
  position: number
  createdAt: string
  updatedAt: string
}

export interface PublicationItem {
  id: string
  sectionId: string
  title: string | null
  url: string | null
  publisher: string | null
  day: number | null
  month: number | null
  year: number | null
  hideDay: boolean
  hideMonth: boolean
  description: string | null
  position: number
  createdAt: string
  updatedAt: string
}

export interface AwardItem {
  id: string
  sectionId: string
  award: string | null
  url: string | null
  issuer: string | null
  day: number | null
  month: number | null
  year: number | null
  hideDay: boolean
  hideMonth: boolean
  description: string | null
  position: number
  createdAt: string
  updatedAt: string
}

export interface CourseItem {
  id: string
  sectionId: string
  name: string | null
  url: string | null
  institution: string | null
  startDate: string | null
  endDate: string | null
  current: boolean
  location: string | null
  description: string | null
  position: number
  createdAt: string
  updatedAt: string
}

export interface DeclarationItem {
  id: string
  sectionId: string
  text: string | null
  signatureUrl: string | null
  fullName: string | null
  place: string | null
  date: string | null
  position: number
  createdAt: string
  updatedAt: string
}

export interface CustomItem {
  id: string
  sectionId: string
  title: string | null
  titleUrl: string | null
  subtitle: string | null
  startDate: string | null
  endDate: string | null
  current: boolean
  location: string | null
  description: string | null
  extra: Record<string, unknown> | null
  position: number
  createdAt: string
  updatedAt: string
}

// DISCRIMINATED UNION — the key pattern
// narrow the item type from section.type
export type SectionItemMap = {
  EXPERIENCE: ExperienceItem
  EDUCATION: EducationItem
  PROJECTS: ProjectItem
  SKILLS: SkillItem
  CERTIFICATIONS: CertificationItem
  LANGUAGES: LanguageItem
  INTERESTS: InterestItem
  REFERENCES: ReferenceItem
  ORGANIZATIONS: OrganizationItem
  PUBLICATIONS: PublicationItem
  AWARDS: AwardItem
  COURSES: CourseItem
  DECLARATION: DeclarationItem
  CUSTOM: CustomItem
}

// union of all item types
export type AnySectionItem = SectionItemMap[keyof SectionItemMap]

// RESUME SECTION
// base section fields shared by all section types
interface ResumeSectionBase {
  id: string
  resumeId: string
  title: string | null
  position: number
  visible: boolean
  createdAt: string
}

// each variant carries only its own items array
export type ResumeSection =
  | (ResumeSectionBase & { type: "EXPERIENCE"; items: ExperienceItem[] })
  | (ResumeSectionBase & { type: "EDUCATION"; items: EducationItem[] })
  | (ResumeSectionBase & { type: "PROJECTS"; items: ProjectItem[] })
  | (ResumeSectionBase & { type: "SKILLS"; items: SkillItem[] })
  | (ResumeSectionBase & { type: "CERTIFICATIONS"; items: CertificationItem[] })
  | (ResumeSectionBase & { type: "LANGUAGES"; items: LanguageItem[] })
  | (ResumeSectionBase & { type: "INTERESTS"; items: InterestItem[] })
  | (ResumeSectionBase & { type: "REFERENCES"; items: ReferenceItem[] })
  | (ResumeSectionBase & { type: "ORGANIZATIONS"; items: OrganizationItem[] })
  | (ResumeSectionBase & { type: "PUBLICATIONS"; items: PublicationItem[] })
  | (ResumeSectionBase & { type: "AWARDS"; items: AwardItem[] })
  | (ResumeSectionBase & { type: "COURSES"; items: CourseItem[] })
  | (ResumeSectionBase & { type: "DECLARATION"; items: DeclarationItem[] })
  | (ResumeSectionBase & { type: "CUSTOM"; items: CustomItem[] })

// TEMPLATE
export interface Template {
  id: string
  name: string
  previewUrl: string
  isPremium: boolean
}

// EXPORT JOB
export type ExportJobStatus = "waiting" | "active" | "completed" | "failed"

export interface ExportJob {
  jobId: string
  status: ExportJobStatus
  fileUrl: string | null
  error: string | null
}

// PUBLIC SHARE LINK
export interface ResumeLink {
  id: string
  resumeId: string
  slug: string
  isActive: boolean
  viewsCount: number
  createdAt: string
}

// RESUME — the full object returned by GET /resumes/:id
export interface Resume {
  id: string
  userId: string
  title: string
  slug: string | null
  isPublic: boolean
  templateId: string | null
  template: Template | null
  header: ResumeHeader | null
  sections: ResumeSection[]
  settings: ResumeSettings | null
  links: ResumeLink[]
  createdAt: string
  updatedAt: string
}

// lightweight version returned by GET /resumes
export interface ResumeSummary {
  id: string
  title: string
  slug: string | null
  isPublic: boolean
  templateId: string | null
  template: Pick<Template, "id" | "name" | "previewUrl"> | null
  createdAt: string
  updatedAt: string
}

// INPUT TYPES

export type CreateResumeInput = {
  title: string
  templateId?: string
}

export type UpdateResumeInput = Partial<
  Pick<Resume, "title" | "templateId" | "isPublic" | "slug">
>

export type CreateSectionInput = {
  type: SectionType
  title?: string
  position: number
}

export type UpdateSectionInput = Partial<
  Pick<ResumeSectionBase, "title" | "position" | "visible">
>

// item input types — strip server fields, keep only editable fields
export type ExperienceItemInput = Omit<
  ExperienceItem,
  "id" | "sectionId" | "createdAt" | "updatedAt"
>
export type EducationItemInput = Omit<
  EducationItem,
  "id" | "sectionId" | "createdAt" | "updatedAt"
>
export type ProjectItemInput = Omit<
  ProjectItem,
  "id" | "sectionId" | "createdAt" | "updatedAt"
>
export type SkillItemInput = Omit<
  SkillItem,
  "id" | "sectionId" | "createdAt" | "updatedAt"
>
export type CertItemInput = Omit<
  CertificationItem,
  "id" | "sectionId" | "createdAt" | "updatedAt"
>
export type LanguageItemInput = Omit<
  LanguageItem,
  "id" | "sectionId" | "createdAt" | "updatedAt"
>
export type InterestItemInput = Omit<
  InterestItem,
  "id" | "sectionId" | "createdAt" | "updatedAt"
>
export type ReferenceItemInput = Omit<
  ReferenceItem,
  "id" | "sectionId" | "createdAt" | "updatedAt"
>
export type OrgItemInput = Omit<
  OrganizationItem,
  "id" | "sectionId" | "createdAt" | "updatedAt"
>
export type PublicationItemInput = Omit<
  PublicationItem,
  "id" | "sectionId" | "createdAt" | "updatedAt"
>
export type AwardItemInput = Omit<
  AwardItem,
  "id" | "sectionId" | "createdAt" | "updatedAt"
>
export type CourseItemInput = Omit<
  CourseItem,
  "id" | "sectionId" | "createdAt" | "updatedAt"
>
export type DeclarationItemInput = Omit<
  DeclarationItem,
  "id" | "sectionId" | "createdAt" | "updatedAt"
>
export type CustomItemInput = Omit<
  CustomItem,
  "id" | "sectionId" | "createdAt" | "updatedAt"
>

// union of all item input types - dispatch map in useItem hook :>
export type AnyItemInput =
  | ExperienceItemInput
  | EducationItemInput
  | ProjectItemInput
  | SkillItemInput
  | CertItemInput
  | LanguageItemInput
  | InterestItemInput
  | ReferenceItemInput
  | OrgItemInput
  | PublicationItemInput
  | AwardItemInput
  | CourseItemInput
  | DeclarationItemInput
  | CustomItemInput
