// Type guards — use to ResumeSection and need to access its typed items array without TypeScript complains :>
import type {
  ResumeSection,
  ExperienceItem,
  EducationItem,
  ProjectItem,
  SkillItem,
  CertificationItem,
  LanguageItem,
  InterestItem,
  ReferenceItem,
  OrganizationItem,
  PublicationItem,
  AwardItem,
  CourseItem,
  DeclarationItem,
  CustomItem,
} from "./resume.types"

export const isExperienceSection = (
  s: ResumeSection
): s is ResumeSection & { type: "EXPERIENCE"; items: ExperienceItem[] } =>
  s.type === "EXPERIENCE"

export const isEducationSection = (
  s: ResumeSection
): s is ResumeSection & { type: "EDUCATION"; items: EducationItem[] } =>
  s.type === "EDUCATION"

export const isProjectsSection = (
  s: ResumeSection
): s is ResumeSection & { type: "PROJECTS"; items: ProjectItem[] } =>
  s.type === "PROJECTS"

export const isSkillsSection = (
  s: ResumeSection
): s is ResumeSection & { type: "SKILLS"; items: SkillItem[] } =>
  s.type === "SKILLS"

export const isCertificationsSection = (
  s: ResumeSection
): s is ResumeSection & {
  type: "CERTIFICATIONS"
  items: CertificationItem[]
} => s.type === "CERTIFICATIONS"

export const isLanguagesSection = (
  s: ResumeSection
): s is ResumeSection & { type: "LANGUAGES"; items: LanguageItem[] } =>
  s.type === "LANGUAGES"

export const isInterestsSection = (
  s: ResumeSection
): s is ResumeSection & { type: "INTERESTS"; items: InterestItem[] } =>
  s.type === "INTERESTS"

export const isReferencesSection = (
  s: ResumeSection
): s is ResumeSection & { type: "REFERENCES"; items: ReferenceItem[] } =>
  s.type === "REFERENCES"

export const isOrganizationsSection = (
  s: ResumeSection
): s is ResumeSection & { type: "ORGANIZATIONS"; items: OrganizationItem[] } =>
  s.type === "ORGANIZATIONS"

export const isPublicationsSection = (
  s: ResumeSection
): s is ResumeSection & { type: "PUBLICATIONS"; items: PublicationItem[] } =>
  s.type === "PUBLICATIONS"

export const isAwardsSection = (
  s: ResumeSection
): s is ResumeSection & { type: "AWARDS"; items: AwardItem[] } =>
  s.type === "AWARDS"

export const isCoursesSection = (
  s: ResumeSection
): s is ResumeSection & { type: "COURSES"; items: CourseItem[] } =>
  s.type === "COURSES"

export const isDeclarationSection = (
  s: ResumeSection
): s is ResumeSection & { type: "DECLARATION"; items: DeclarationItem[] } =>
  s.type === "DECLARATION"

export const isCustomSection = (
  s: ResumeSection
): s is ResumeSection & { type: "CUSTOM"; items: CustomItem[] } =>
  s.type === "CUSTOM"
